// 购物车流程

var removeproduct = function(_id, user) {
      $.ajax({
            cache : false,
            type  : "delete",
            url   : apiUrl + '/cart',
            async : false,
            data : '_id='+_id+'&user='+user,
            error : function(request) {
                  swal('Oops','For failure！','error');
            },
            success : function(result) {
                  window.location.reload();
            }
      });
}
var updateProduct = function(_id, user, number) {
      $.ajax({
            cache : false,
            type  : "put",
            url   : apiUrl + '/cart',
            async : false,
            data : '_id=' + _id + '&user=' + user + '&number=' + number,
            error : function(request) {
                  swal('Oops','For failure！','error');
            },
            success : function(result) {
                  window.location.reload();
            }
      });
}

$(function() {
      var cookieuser = $.cookie('user');
      // 没登录
      if(!cookieuser) {
            window.location.replace("login.html");
            return;
      } else {
            var user = JSON.parse(cookieuser).user;
            var total = 0;
            $.ajax({
                  cache : false,
                  type  : "get",
                  url   : apiUrl + '/cart?user=' + user._id,
                  async : false,
                  error : function(request) {
                        swal('Oops...','For failure！','error');
                  },
                  success : function(result) {
                        if(result.status) {
                              var str = "";
                              for (var i = 0; i<result.cart.cart_item.length; i++)
                              {
                                    var item = result.cart.cart_item[i];
                                    var subtotal = item.product.price * item.number;

                                    str += '<div class="row">\
                                          <div class="col-md-4 col-xs-4">\
                                                <img src="'+(item.product.img.length>0?item.product.img[0].path:'')+'" alt="product-img" class="item-img"/>\
                                                <strong>'+item.product.name+'</strong>\
                                          </div>\
                                          <div class="col-md-2 col-xs-2">¥ '+item.product.price+'</div>\
                                          <div class="col-md-2 col-xs-2">\
                                                <input type="text" ref="'+item._id+'" value="'+item.number+'" class="qty">\
                                          </div>\
                                          <div class="col-md-2 col-xs-2"><a href="javascript:void(0);" onclick="removeproduct(\''+item._id+'\',\''+user._id+'\')"><i class="fa fa-trash-o fa-lg"></i></a></div>\
                                          <div class="col-md-2 col-xs-2">¥ '+subtotal+'</div>\
                                    </div>';
                                    total += subtotal;
                              }
                              $('#cart-box').html(str);
                              $('#total').html(total);

                              $("input").blur(function(){
                                    var _id = $(this).attr('ref');
                                    var val = $(this).val();
                                    updateProduct(_id, user._id, val)
                              });
                        }
                  }
            });
      }
});



$('#tobuy').on('click',function(){
      var cookieuser = $.cookie('user');
      // 没登录
      if(!cookieuser) {
            window.location.replace("login.html");
            return;
      } else {
            var user = JSON.parse(cookieuser).user;
            swal({
                  title : 'Shipping Info',
                  showCancelButton : true,
                  confirmButtonText : 'Submit',
                  html : 
                        '<form id="cartfrom">'+
                        '<input name="recipients" class="swal2-input" autofocus placeholder="Name" id="name"/>'+
                        '<input name="phone" class="swal2-input" placeholder="Mobile" id="mobile"/>'+
                        '<input name="email" class="swal2-input" placeholder="Email" id="email"/>'+
                        '<textarea name="address" class="swal2-textarea" placeholder="Address" style="height: 66px; resize: none;" id="address"></textarea>'+
                        '<p style="color: red; display: none;" id="error-msg">Please ensure all fields are filled in before submitting order.</p>'+
                        '<p class="text-l"><strong>Please Select a Delivery Option:</strong></p>'+
                        '<div class="text-l"><input type="radio" value="Express Delivery (20 rmb delivery fee)" name="type" checked="checked" style="margin-right: 10px;"/>Express Delivery (20 rmb delivery fee)</div>'+
                        '<div class="text-l"><input type="radio" value="Self-Pickup from Z&B Studio" name="type" style="margin-right: 10px;"/>Self-Pickup from Z&B Studio</div>'+
                        '</form>',

                  preConfirm: function() {
                        var name = $('#name').val(),
                        email = $('#email').val(),
                        mobile = $('#mobile').val(),
                        address = $('#address').val(),
                        phoneReg = /(^[0-9]{3,4}-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^[0−9]3,4[0-9]{3,8}$)|(^0{0,1}1[0-9]{10}$)/,
                        reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;

                        if(name == '' || mobile == ''){
                              $('#error-msg').css('display','block');
                        }else if(!reg.test(email) || email == ''){
                              $('#error-msg').css('display','block');
                        }else if(!phoneReg.test(mobile) || mobile == '') { 
                              $('#error-msg').css('display','block');
                        }else{
                              return new Promise(function(resolve) {
                                   resolve([name,email,mobile,address]);
                              });
                        }
                  },
            }).then(function(result) {
                   if(result) {
                        var address = $('#cartfrom').serialize();                        

                        $.ajax({
                              cache : false,
                              type  : "post",
                              url   : apiUrl + '/order',
                              async : false,
                              data : address+'&user='+user._id,
                              error : function(request) {
                                    swal('Oops','For failure！','error');
                              },
                              success : function(result) {
                                    swal({
                                          title : 'Done!',
                                          text : 'Thanks for submitting your order! The MYbarre team will reach out to you shortly to arrange for payment and delivery',
                                          type : 'success',
                                          showCancelButton : false,
                                    }).then(function() {
                                          window.location.href = homeUrl;
                                    })
                              }
                        });
                        
                  }
            })
      }
});