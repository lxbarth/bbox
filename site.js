$(function() {
    var map = new MM.Map('map',
        new MM.Layer(
            new MM.TemplatedMapProvider(
                'http://tile.openstreetmap.org/{Z}/{X}/{Y}.png'
            )
        )
    );
    map.setZoomRange(2, 18);
    map.setZoom(2).setCenter({ lat: 10, lon: 0 });
});
