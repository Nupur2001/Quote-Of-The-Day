document.addEventListener('DOMContentLoaded', () => {
    let body = document.body;
    let btn = document.querySelector('button');
    let quoteDisplay = document.querySelector('.quoteDisplay');
    let authorDisplay = document.querySelector('.authorDisplay');
    let displayNoneAfterQoute = document.querySelectorAll('.displayNoneAfterQoute');

    function getRandomQuote() {
        fetch('https://dummyjson.com/quotes/random')
            .then(res => res.json())
            .then((data) => {
              
                    quoteDisplay.innerHTML = `<i class="fa-solid fa-quote-left"></i> ${data.quote} <i class="fa-solid fa-quote-right"></i>`;  
                    authorDisplay.innerHTML = `- ${data.author}`;

                    displayNoneAfterQoute.forEach((q) => {
                        q.style.display = "none";
                    });

                    console.log(data.quote);
                    console.log(data.author);
            })
            .catch((e) => console.error("Error occurred while fetching", e));
    }

    function getContrastYIQ(hexcolor) {
        var r = parseInt(hexcolor.substring(0, 2), 16);
        var g = parseInt(hexcolor.substring(2, 4), 16);
        var b = parseInt(hexcolor.substring(4, 6), 16);
        var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        return (yiq >= 128) ? 'black' : 'white';
    }

    function getRandomColor() {
        return Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    }

    function randomColor() {
        let colorCode = getRandomColor();
        fetch(`https://www.thecolorapi.com/id?hex=${colorCode}&format=json`)
            .then(response => response.json())
            .then(data => {
                console.log(`Name: ${data.name.value}`);
                console.log(`RGB: ${data.rgb.value}`);
                console.log(`HSL: ${data.hsl.value}`);
                body.style.backgroundColor = data.rgb.value;

                let contrastColor = getContrastYIQ(colorCode);
                body.style.color = contrastColor;
            })
            .catch((e) => console.error("Error occurred while fetching", e));
    }

    btn.addEventListener('click', () => {
        Promise.all([randomColor(),getRandomQuote()])
    });
});
