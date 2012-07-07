window.onload = function() {
    var url = "http://www.overpass-api.de/api/xapi?map?bbox=";
    var map = new MM.Map('map',
        new MM.Layer(
            new MM.TemplatedMapProvider(
                'http://tile.openstreetmap.org/{Z}/{X}/{Y}.png'
            )
        )
    );
    map.setZoomRange(2, 18);
    map.setZoom(2).setCenter({ lat: 18, lon: 0 });

    // Set up box selector and update query div with result.
    wax.mm.boxselector(map, null, function(c) {
        var query = document.getElementById('query');
        query.innerText = url + [
            c[0].lon.toPrecision(8),
            c[1].lat.toPrecision(8),
            c[1].lon.toPrecision(8),
            c[0].lat.toPrecision(8)
        ].join(',');
    });
    
    // Select query when clicked.
    document.getElementById('query').addEventListener('click', function(e) {
        var range = document.createRange();
        range.selectNode(e.target);
        window.getSelection().addRange(range);
        e.target.select && e.target.select();
    });

    // Make sure map navigation does not interfere with box
    // selecting - TODO: Is this necessary or am I missing sth?
    window.addEventListener('keydown', function() {
        var h;
        while (h = map.eventHandlers.pop()) { h.remove(); }
    });
    window.addEventListener('keyup', function() {
        if (map.eventHandlers.length == 2) return;
        map.eventHandlers = [
            new MM.MouseHandler(map),
            new MM.TouchHandler(map)
        ];
    });
};
