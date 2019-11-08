Oskari.clazz.define('Oskari.statistics.statsgrid.FlyoutManager', function (instance) {
    this.instance = instance;
    this.flyouts = {};
    var loc = instance.getLocalization();
    Oskari.makeObservable(this);
    this.service = instance.getStatisticsService().getStateService();

    this.flyoutInfo = [
        {
            id: 'search',
            title: loc.tile.search,
            oskariClass: 'Oskari.statistics.statsgrid.view.SearchFlyout',
            cls: 'statsgrid-search-flyout'
        },
        {
            id: 'table',
            title: loc.tile.table,
            oskariClass: 'Oskari.statistics.statsgrid.view.TableFlyout',
            cls: 'statsgrid-data-flyout'
        },
        {
            id: 'diagram',
            title: loc.tile.diagram,
            oskariClass: 'Oskari.statistics.statsgrid.view.DiagramFlyout',
            cls: 'statsgrid-diagram-flyout'
        },
        {
            id: 'indicatorForm',
            hideTile: true,
            title: loc.userIndicators.flyoutTitle || 'Add indicator',
            oskariClass: 'Oskari.statistics.statsgrid.view.IndicatorFormFlyout',
            cls: 'statsgrid-user-indicator-flyout'
        }
    ];
}, {
    init: function () {
        if (Object.keys(this.flyouts).length) {
            // already initialized
            return;
        }

        var me = this;
        var p = jQuery('#mapdiv');
        var position = p.position().left;
        var offset = 40;

        this.flyoutInfo.forEach(function (info) {
            var flyout = Oskari.clazz.create(info.oskariClass, info.title, {
                width: 'auto',
                cls: info.cls,
                pos: {
                    x: position + offset,
                    y: 5
                }
            }, me.instance);
            flyout.makeDraggable({
                handle: '.oskari-flyouttoolbar, .statsgrid-data-container > .header',
                scroll: false
            });

            flyout.bringToTop();
            flyout.on('hide', function () {
                me.trigger('hide', info.id);
            });
            me.flyouts[info.id] = flyout;
            position = position + flyout.getSize().width;
            if (info.id === 'diagram') {
                flyout.makeResizable({
                    minWidth: 630,
                    minHeight: 400,
                    handle: '.oskari-flyouttoolbar, .statsgrid-data-container > .header',
                    scroll: false
                });
            }
        });
    },
    open: function (type) {
        var me = this;
        var flyout = me.flyouts[type];
        if (!flyout) {
            return;
        }

        const indicators = this.service.getIndicators();

        if ((type === 'diagram' || type === 'table') && indicators.length === 0) {
            const searchFlyout = me.flyouts['search'];
            searchFlyout.move(searchFlyout.options.pos.x, searchFlyout.options.pos.y, true);
            searchFlyout.show();
            this.trigger('show', 'search');
            const calculutedFlyoutPositionX = searchFlyout.options.pos.x + searchFlyout._popup[0].clientWidth + 5;
            flyout.move(calculutedFlyoutPositionX, flyout.options.pos.y, true);
        } else {
            flyout.move(flyout.options.pos.x, flyout.options.pos.y, true);
        }

        flyout.show();
        this.trigger('show', type);
    },
    hide: function (type) {
        var me = this;
        var flyout = me.flyouts[type];
        if (!flyout) {
            return;
        }
        flyout.hide();
    },
    toggle: function (type) {
        var flyout = this.getFlyout(type);
        if (!flyout) {
            // unrecognized flyout
            return;
        }
        if (flyout.isVisible()) {
            this.hide(type);
            return;
        }
        // open flyout
        this.open(type);
    },
    getFlyout: function (type) {
        return this.flyouts[type];
    }
});
