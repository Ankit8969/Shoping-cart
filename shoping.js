
var ShopButton=document.getElementsByClassName('shop-item-button');
for(var i=0;i<ShopButton.length;i++)
{
  var title=ShopButton[i];
  title.addEventListener('click',addToCart);
}

function addToCart(event)
{
  var title=event.target.parentElement.parentElement;
  var NameOfProduct=title.getElementsByClassName('shop-item-title')[0].innerText;
  var PriceOfProduct=title.getElementsByClassName('shop-item-price')[0].innerText;
//  console.log(NameOfProduct,PriceOfProduct);
  var NameOfImage=title.getElementsByClassName('shop-item-image')[0].src;
//  console.log(NameOfImage);
  var x=document.getElementsByClassName('cart-item-title');
  for(var i=0;i<x.length;i++)
  {
    if(NameOfProduct==x[i].innerText)
    {
      alert("This item is already in your cart");
      return;
    }
  }
  createrow(NameOfProduct,PriceOfProduct,NameOfImage);
  quantityInput();
  removed();
  updateCart();
  }

  var purchase=document.getElementsByClassName('btn-purchase')[0].addEventListener('click',purchaseitem);

function purchaseitem()
{
  alert('Thanks for purchase ');
  var x=document.getElementsByClassName('cart-items')[0];
  while(x.hasChildNodes())
  {
    x.removeChild(x.firstChild);
  }
  updateCart();
}

function createrow(NameOfProduct,PriceOfProduct,NameOfImage)
{
  var CartRow=document.createElement('div');
  var CartItems=document.getElementsByClassName('cart-items')[0];
  CartRow.classList.add('cart-row');
  var CartRowContents= `
            <div class="cart-item cart-column">
                <img class="cart-item-image" src="${NameOfImage}" width="100" height="100">
                <span class="cart-item-title">${NameOfProduct}</span>
            </div>
            <span class="cart-price cart-column">${PriceOfProduct}</span>
            <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" type="number" value="1">
                <button class="btn btn-danger" type="button">REMOVE</button>
            </div> ` ;
    CartRow.innerHTML=CartRowContents;
    CartItems.append(CartRow);
}





function removed()
{
  var RemoveCartItems=document.getElementsByClassName('btn-danger');
  //console.log(RemoveCartItems)
  for(var i=0;i<RemoveCartItems.length;i++)
  {
    var button=RemoveCartItems[i];
    button.addEventListener('click',remove);
  }
}

function remove(event)
{
  //alert('I am removed');
  var buttonClicked=event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCart();
};

function updateCart()
{
  var CartItems=document.getElementsByClassName('cart-items')[0];
  var CartRows=CartItems.getElementsByClassName('cart-row');
  var total=0;
  for(var i=0;i<CartRows.length;i++)
  {
    var CartRow=CartRows[i];
    var CartPrice=CartRow.getElementsByClassName('cart-price')[0];
    var CartQuantity=CartRow.getElementsByClassName('cart-quantity-input')[0].value;
    var Price=CartPrice.innerText;
    var rate=parseFloat(Price.slice(1));
    var number=parseInt(CartQuantity);
    total=total + (rate * number);
    //console.log(sum);
  }
  document.getElementsByClassName('cart-total-price')[0].innerText='$' + Math.round(total);
}

function quantityInput()
{
  var quantityinput=document.getElementsByClassName('cart-quantity-input');
  //console.log(quantityinput.length);
  for(var i=0;i<quantityinput.length;i++)
  {
    var input=quantityinput[i];
    input.addEventListener('change',quantitychanged);
  }
}

function quantitychanged(event)
{
//  console.log(event.target.value);
  if(event.target.value<1)
  {
    parseInt((event.target.value=1));
  }
  updateCart();
}
