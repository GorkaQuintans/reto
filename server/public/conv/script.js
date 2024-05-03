

        document.getElementById('convert').addEventListener('click', function() {
            var xml = document.getElementById('input').value;
            var result = xmlToJson(new DOMParser().parseFromString(xml, 'text/xml'));
            var json = JSON.stringify(result, null, 2);
            document.getElementById('output').value = json;
        
            // Crear un objeto Blob con los datos en formato JSON
            var blob = new Blob([json], {type: 'application/json'});
        
            // Crear una URL para el Blob
            var url = URL.createObjectURL(blob);
        
            // Configurar el botón de descarga
            var downloadButton = document.getElementById('download');
            downloadButton.href = url;
            downloadButton.download = 'data.json';
            downloadButton.style.display = 'block';
        });


        document.getElementById('convert').addEventListener('click', function() {
            var xml = document.getElementById('input').value;
            var result = xmlToJson(new DOMParser().parseFromString(xml, 'text/xml'));
            document.getElementById('output').value = JSON.stringify(result, null, 2);
        });

        function xmlToJson(xml) {
            var obj = {};
            if (xml.nodeType == 1) {
                if (xml.attributes.length > 0) {
                    obj["@attributes"] = {};
                    for (var j = 0; j < xml.attributes.length; j++) {
                        var attribute = xml.attributes.item(j);
                        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
                    }
                }
            } else if (xml.nodeType == 3) {
                obj = xml.nodeValue;
            }
            if (xml.hasChildNodes()) {
                for(var i = 0; i < xml.childNodes.length; i++) {
                    var item = xml.childNodes.item(i);
                    var nodeName = item.nodeName;
                    if (typeof(obj[nodeName]) == "undefined") {
                        obj[nodeName] = xmlToJson(item);
                    } else {
                        if (typeof(obj[nodeName].push) == "undefined") {
                            var old = obj[nodeName];
                            obj[nodeName] = [];
                            obj[nodeName].push(old);
                        }
                        obj[nodeName].push(xmlToJson(item));
                    }
                }
            }
            return obj;
        };