// ymaps.ready(function () {
//      var myMap = new ymaps.Map('map', {
//          center: [59.938779, 30.336639],
//          zoom: 15
// }, {
//         searchControlProvider: 'yandex#search'
//     });
//
// myPlacemark = new ymaps.Placemark([59.938854, 30.323223], {
//             // hintContent: 'Собственный значок метки',
//             // balloonContent: 'Это красивая метка'
//         }, {
//             // Опции.
//             // Необходимо указать данный тип макета.
//             iconLayout: 'default#image',
//             // Своё изображение иконки метки.
//             iconImageHref: 'img/icons/map-marker.png',
//             // Размеры метки.
//             iconImageSize: [80, 142],
//             // Смещение левого верхнего угла иконки относительно
//             // её "ножки" (точки привязки).
//             iconImageOffset: [-5, -38]
//
//         });
//         myMap.geoObjects
//             .add(myPlacemark);
//     });

var createChipsLayout = function (calculateSize) {
// Создадим макет метки.
    var Chips = ymaps.templateLayoutFactory.createClass(
        '<div class="placemark"></div>',
        {
            build: function () {
                Chips.superclass.build.call(this);
                var map = this.getData().geoObject.getMap();
                if (!this.inited) {
                    this.inited = true;
                    // Получим текущий уровень зума.
                    var zoom = map.getZoom();
                    // Подпишемся на событие изменения области просмотра карты.
                    map.events.add('boundschange', function () {
                        // Запустим перестраивание макета при изменении уровня зума.
                        var currentZoom = map.getZoom();
                        if (currentZoom != zoom) {
                            zoom = currentZoom;
                            this.rebuild();
                        }
                    }, this);
                }
                var options = this.getData().options,
                    // Получим размер метки в зависимости от уровня зума.
                    size = calculateSize(map.getZoom()),
                    element = this.getParentElement().getElementsByClassName('placemark')[0],
                    // По умолчанию при задании своего HTML макета фигура активной области не задается,
                    // и её нужно задать самостоятельно.
                    // Создадим фигуру активной области "Круг".
                    circleShape = {type: 'Circle', coordinates: [0, 0], radius: size / 2};
                // Зададим высоту и ширину метки.
                element.style.width = element.style.height = size + 'px';
                // Зададим смещение.
                element.style.marginLeft = element.style.marginTop = -size / 2 + 'px';
                // Зададим фигуру активной области.
                options.set('shape', circleShape);
            }
        }
    );

    return Chips;
};

ymaps.ready(function () {
    var map = new ymaps.Map('map', {
        center: [59.938779, 30.336639],
        zoom: 15
    });

    map.geoObjects.add(new ymaps.Placemark([59.938631, 30.323055], {
        // balloonContent: 'Линейная зависимость размера метки от уровня зума',
        // hintContent: 'Линейная зависимость'

    }, {
        iconLayout: createChipsLayout(function (zoom) {
            // Минимальный размер метки будет 8px, а максимальный мы ограничивать не будем.
            // Размер метки будет расти с линейной зависимостью от уровня зума.
            return 6 * zoom + 8;
        })
    }));
    
});
