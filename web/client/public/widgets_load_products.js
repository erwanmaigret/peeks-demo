var widget = document.getElementById('peeks_shoe');
if (widget.peeksReady === undefined) {
    PEEKS.start('peeks_shoe', 'widget_shoe');
    widget.peeksReady = true;
}
