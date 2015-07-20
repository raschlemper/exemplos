app.factory("MessageService", function(ngToast) {
    return {
        success: function(message) {
            ngToast.success({content:'<i class="icon-check" style="margin-right:5px"></i> '+message});
        },
        warning: function(message){
            ngToast.warning(message);
        },
        info: function(message){
            ngToast.info({content:'<i class="icon-info" style="margin-right:5px"></i> '+message});
        },
        danger: function(message){
            ngToast.danger({content:'<i class="icon-close" style="margin-right:5px"></i> '+message}); 
        }
    }
});
