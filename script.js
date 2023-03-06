let modalQt = 1;

// função anonima
const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);

// lisatagem das pizzas
pizzaJson.map((item, index) => {

    let pizzaItem = c('.models .pizza-item').cloneNode(true);

    pizzaItem.setAttribute('data-key', index);

    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();

        // recuperando o index da pizza
        let key = e.target.closest('.pizza-item').getAttribute('data-key');

        // resetando a quantidade de pizza para 1 toda vez que abrir um modal
        modalQt = 1;

        c('.pizzaBig img').src = pizzaJson[key].img;
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;

        c('.pizzaInfo--size.selected').classList.remove('selected');

        cs('.pizzaInfo--size').forEach((size, sizeIndex) => {

            // if (sizeIndex == 2) {
            //     size.classList.add('selected');
            // }
            // verificando se tamanho da pizza é [2], se for adiciona a classe .selected
            sizeIndex == 2 ? size.classList.add('selected') : '';

            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];

        });

        c('.pizzaInfo--qt').innerHTML = modalQt;

        c('.pizzaWindowArea').style.opacity = 0;
        c('.pizzaWindowArea').style.display = 'flex'
        setTimeout(() => {
            c('.pizzaWindowArea').style.opacity = 1;
        }, 200)
    });

    c('.pizza-area').append(pizzaItem);

});


// Eventos do modal
const closeModal = () => {
    c('.pizzaWindowArea').style.opacity = 0;
    setTimeout(() => {
        c('.pizzaWindowArea').style.display = 'none';
    }, 500);
}

cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', closeModal);
});

// botão para diminuir a quantidade de pizza
c('.pizzaInfo--qtmenos').addEventListener('click', () => {

    if (modalQt > 1) {
        modalQt--;
        c('.pizzaInfo--qt').innerHTML = modalQt;
    };
});

// botão para somar a quantidade de pizza
c('.pizzaInfo--qtmais').addEventListener('click', () => {
    modalQt++;
    c('.pizzaInfo--qt').innerHTML = modalQt;
});

// click e selecionando o botão do tamanho
cs('.pizzaInfo--size').forEach((size, sizeIndex) => {

    size.addEventListener('click', (e) => {
        c('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    });


});
