// 购物车流程

$('#tobuy').on('click',function(){
      swal({
            title : 'Shipping Info',
            showCancelButton : true,
            html : 
                  '<input id="name" class="swal2-input" autofocus placeholder="Name"/>'+
                  '<input id="phone" class="swal2-input" placeholder="Mobile"/>'+
                  '<textarea id="address" class="swal2-textarea" placeholder="Address" style="height: 66px; resize: none;"></textarea>'+
                  '<p class="text-l"><strong>Please Select a Delivery Option:</strong></p>'+
                  '<div class="text-l"><input type="radio" value="delivery" name="type" style="margin-right: 10px;"/>Express Delivery (20 rmb delivery fee)</div>'+
                  '<div class="text-l"><input type="radio" value="self" name="type" style="margin-right: 10px;"/>Self-Pickup from Z&B Studio</div>',
      }).then(function(isConfirm) {
            if(isConfirm === true) {
                  swal('','Thanks for submitting your order! The MYbarre team will reach out to you shortly to arrange for payment and delivery. ','success');
            }
      })
});