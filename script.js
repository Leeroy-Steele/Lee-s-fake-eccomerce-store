let productData = [] // raw data from api

let displayData = []  // filtered products from search / category select

fetch('https://fakestoreapi.com/products')
        .then((response) => response.json())
        .then((json) => {
            console.log(json)
            productData = json
            displayData = json
            showProducts()
          })

const showProducts = ()=>{

    parentDiv.replaceChildren()

    displayData.forEach((obj)=>{

        const template = document.getElementById("card-template").content.cloneNode(true);


        template.querySelector('.card-text').innerText = obj.description;
        template.querySelector('.card-img-top').src = obj.image;
        template.querySelector('.card-price').innerText = `Price: $${obj.price}`   
        template.querySelector('.card-rating').innerText = `Rating: ${obj.rating.rate} out of 5` 
        template.querySelector('.card-count').innerText = `In stock: ${obj.rating.count}` 
        
        if(obj.category===`men's clothing`){template.querySelector('.card-title').innerHTML+=`<span class="iconify" data-icon="icon-park:clothes-suit" data-width="30" data-height="40"></span>   `}           ;
        if(obj.category===`jewelery`){template.querySelector('.card-title').innerHTML+=`<span class="iconify" data-icon="map:jewelry-store" data-width="30" data-height="40"></span>   `}           ;
        if(obj.category===`women's clothing`){template.querySelector('.card-title').innerHTML+=`<span class="iconify" data-icon="ph:dress" data-width="30" data-height="40"></span>   `}           ;
        if(obj.category===`electronics`){template.querySelector('.card-title').innerHTML+=`<span class="iconify" data-icon="mdi:electricity-circle" data-width="30" data-height="40"></span>   `}           ;
        template.querySelector('.card-title').innerHTML += obj.title;
        

        parentDiv.appendChild(template)
    })
}


const changeCategory = (cat)=>{

    if(cat!=="all"){
        displayData = productData.filter((item)=>{
            return item.category == cat
            
        })
    }else{
        displayData = productData
    }



    showProducts()

}

const searchForItem = ()=>{

    let str = document.getElementById('searchText').value 

    displayData = []
    
    productData.forEach(item=>{
        item.title.includes(str) ? displayData.push(item): null
    })
    
    console.log(displayData)
    showProducts()

}
  