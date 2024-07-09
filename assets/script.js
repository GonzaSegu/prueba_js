
let grafico = null
const handleClick = async () =>{
    const select = document.querySelector('#currency')
    const dinero = document.querySelector('#dinero')
    if (!select.value || !dinero.value)  
        alert('complete los campos necesarios')
    else{ 
        const url = "https://mindicador.cl/api/" + select.value
        console.log(url)
        try{
            const res = await fetch(url)
            const base = await res.json()
            const info = base.serie.slice(0,10)
            console.log(info)
            const etiquetas = info.map( (day) => day.fecha.split('T')[0])
            console.log(etiquetas)
            const valores = info.map( (day) => day.valor)
            console.log(valores)
            const conversion =  dinero.value /valores[0]
            document.querySelector('h1').innerText = '$' + conversion.toFixed(3)

            if (grafico) {
                grafico.destroy();
            }
            const config = {
                type: "line",
                data:{
                    labels: etiquetas.reverse(),
                    datasets:[{
                        label: select.value,
                        backgroundColor: "rgb(255, 99, 132)",
                        data: valores.reverse(),
                    }]
                }
            };
            const myChart = document.getElementById("myChart");
            myChart.style.backgroundColor = "white";
            grafico = new Chart(myChart, config);
        } catch(error) {
            //console.error("Error fetching or processing data: ", error)
            alert("Hubo un error al obtener los datos. Por favor, intente nuevamente.")
            //errorMensaje.innerText = "*Hubo un error al obtener los datos. Por favor, intente nuevamente."
            //errorMensaje.style.display = "block"
        }
    }
}
 
const searchButton = document.querySelector('#search')
searchButton.addEventListener('click', handleClick)


