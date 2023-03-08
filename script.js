let cart = [];
let modalQt = 1;
let modalKey = 0;

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

        modalKey = key;


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

// ação botão carrinho
c('.pizzaInfo--addButton').addEventListener('click', () => {
    let size = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key'));

    // monta um identificador com o Id da Pizza e o Id do Tamanho da Pizza
    let identifier = pizzaJson[modalKey].id + '@' + size;

    // verifica se existe o itenfificador dentro do array carrinho
    let key = cart.findIndex((item) => item.identifier == identifier);

    // condição que ira verificar, se o valor do [key] for
    // maior que 1, quer dizer que já existe esse identificador
    // sendo assim ele soma a quantidade que ja tem no carrinho 
    // mais a quantidade selecionada
    if (key > -1) {

        cart[key].qt += modalQt;

    } else {
        // se [key] for igual a [-1] é porque o identificador
        // não existe, sendo assim, ele adiciona no array [cart]
        cart.push({
            identifier,
            id: pizzaJson[modalKey].id,
            size,
            qt: modalQt
        });

    }

    // atualiza o carrinho de compra com as novas pizzas selecionadas
    updateCart();

    //chama a função para fechar o modal
    closeModal();
});

// função para atualizar o carrinho de compra
const updateCart = () => {

    if (cart.length > 0) {
        c('aside').classList.add('show');
        c('.cart').innerHTML = '';

        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        for (let i in cart) {

            // recuperando todas as informações da pizza que foi adicionada no carrinho
            let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id);

            // subtotal da pizza, a soma do valor inicial,
            // mais o valor da pizza vezes a quantidade de pizza que esta no carrinho
            subtotal += pizzaItem.price * cart[i].qt;

            let cartItem = c('.models .cart--item').cloneNode(true);

            let pizzaSizeName;

            switch (cart[i].size) {
                case 0:
                    pizzaSizeName = "P";
                    break;
                case 1:
                    pizzaSizeName = "M";
                    break;
                case 2:
                    pizzaSizeName = "G";
                    break;
            }

            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`

            cartItem.querySelector('.cart--item img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item .cart--item-nome').innerHTML = pizzaName;
            cartItem.querySelector('.cart--item .cart--item--qt').innerHTML = cart[i].qt;

            cartItem.querySelector('.cart--item .cart--item-qtmenos').addEventListener('click', () => {
                if (cart[i].qt > 1) {
                    cart[i].qt--;
                } else {
                    cart.splice(i, 1)
                };
                updateCart();
            });

            cartItem.querySelector('.cart--item .cart--item-qtmais').addEventListener('click', () => {
                cart[i].qt++;
                updateCart();
            });

            c('.cart').append(cartItem);

        }

        desconto = subtotal * 0.1;
        total = subtotal - desconto;

        c('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`
        c('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`
        c('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`


    } else {
        c('aside').classList.remove('show');
    }
}
