app.factory("BlockService", function(blockUI) {

    return {
        block: function(message) {
            blockUI.start();
            blockUI.message(message);
        },
        stop: function() {
            blockUI.stop();
        }
    }
});
