// Grafik verilerini tutan nesne
let chartData = {
    labels: [], // X ekseni için etiketler (başlangıçta boş)
    datasets: [{
        label: '# of Values', // Grafik için veri setinin etiketi
        data: [], // Grafik için veri seti (başlangıçta boş)
        backgroundColor: [ // Veri sütunları için arka plan renkleri
            'rgba(255, 99, 132, 0.5)', // Kırmızı
            'rgba(54, 162, 235, 0.5)', // Mavi
            'rgba(255, 206, 86, 0.5)', // Sarı
            'rgba(75, 192, 192, 0.5)', // Turkuaz
            'rgba(153, 102, 255, 0.5)', // Mor
            'rgba(255, 159, 64, 0.5)' // Turuncu
        ],
        borderColor: [ // Veri sütunları için kenarlık renkleri
            'rgba(255, 99, 132, 1)', // Kırmızı
            'rgba(54, 162, 235, 1)', // Mavi
            'rgba(255, 206, 86, 1)', // Sarı
            'rgba(75, 192, 192, 1)', // Turkuaz
            'rgba(153, 102, 255, 1)', // Mor
            'rgba(255, 159, 64, 1)' // Turuncu
        ],
        borderWidth: 1 // Kenarlık genişliği
    }]
};

// Yeni bir grafik oluşturmak için kullanılan fonksiyon
function createChart(type, height = 400) {
    const canvasContainer = document.getElementById('canvas-container'); // Grafik için kapsayıcı elemanı al
    canvasContainer.innerHTML = `<canvas id="myChart"></canvas>`; // Kapsayıcıyı temizle ve yeni bir canvas ekle
    canvasContainer.style.height = `${height}px`; // Kapsayıcının yüksekliğini belirle

    const ctx = document.getElementById('myChart').getContext('2d'); // Canvas'ın 2D bağlamını al
    return new Chart(ctx, { // Chart.js kütüphanesiyle yeni bir grafik oluştur
        type: type, // Grafik tipi (bar, line, vb.)
        data: chartData, // Grafik verileri
        options: {
            scales: {
                y: {
                    beginAtZero: true // Y ekseni sıfırdan başlasın
                }
            },
            onClick: (event, activeElements) => { // Grafiğe tıklama olayı
                if (activeElements.length > 0) { // Eğer tıklanan bir veri varsa
                    const { datasetIndex, index } = activeElements[0]; // Tıklanan veri seti ve indeksini al
                    removeData(datasetIndex, index); // Bu veriyi kaldır
                }
            },
            tooltips: {
                mode: 'index', // Tooltip modu (index)
                intersect: false // Tooltip kesişim olmasın
            },
            hover: {
                mode: 'index', // Hover modu (index)
                intersect: false // Hover kesişim olmasın
            }
        }
    });
}

// Varsayılan olarak bir bar grafiği oluştur
let myChart = createChart('bar');

// Yeni veri eklemek için kullanılan fonksiyon
function addData() {
    const labelInput = document.getElementById('labelInput'); // Etiket girdisini al
    const dataInput = document.getElementById('dataInput'); // Veri girdisini al

    if (labelInput.value && dataInput.value) { // Eğer etiket ve veri girdisi doluysa
        chartData.labels.push(labelInput.value); // Etiketi ekle
        chartData.datasets.forEach((dataset) => {
            dataset.data.push(dataInput.value); // Veriyi ekle
        });
        myChart.update(); // Grafiği güncelle
        labelInput.value = ''; // Girdiyi temizle
        dataInput.value = ''; // Girdiyi temizle
    }
}

// Grafik türünü değiştirmek için kullanılan fonksiyon
function updateChartType() {
    const selectedType = document.getElementById('chartType').value; // Seçilen grafik türünü al
    myChart.destroy(); // Mevcut grafiği yok et
    myChart = createChart(selectedType); // Yeni grafik türüyle grafiği yeniden oluştur
}

// Veriyi kaldırmak için kullanılan fonksiyon
function removeData(datasetIndex, index) {
    if (chartData.labels.length > index) { // Eğer indeks geçerli ise
        chartData.labels.splice(index, 1); // Etiketi kaldır
        chartData.datasets[datasetIndex].data.splice(index, 1); // Veriyi kaldır
        myChart.update(); // Grafiği güncelle
    }
}
