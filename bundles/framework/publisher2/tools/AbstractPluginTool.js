Oskari.clazz.define('Oskari.mapframework.publisher.tool.AbstractPluginTool', 
/**
 * Base-class for plugin based map tools for publisher bundle
 * @param  {[type]} sandbox      [description]
 * @param  {[type]} mapmodule    [description]
 * @param  {[type]} localization [description]
 * @return {[type]}              [description]
 */
function(sandbox, mapmodule, localization) {
    this.__index = 0;
    this.__sandbox = sandbox;
    this.__mapmodule = mapmodule;
    this.__loc = localization[this.group];
    this.__plugin = null;
	this.state= {
		enabled: false,
		mode:null
	};
}, {
	// override to change group
	group : 'maptools',
	// 'bottom left', 'bottom right' etc
    allowedLocations : [],
    // List of plugin classes that can reside in same container(?) like 'Oskari.mapframework.bundle.mapmodule.plugin.LogoPlugin'
    allowedSiblings : [],
    // ??
    groupedSiblings : false,

    /**
    * Get tool object.
    * @method getTool
    * @private
    *
    * @returns {Object} tool
    */
    getTool: function(){
    	// override
    },
	/**
	* Set enabled.
	* @method setEnabled
	* @public
	*
	* @param {Boolean} enabled is tool enabled or not
	*/
   	setEnabled : function(enabled) {
   		var me = this,
            tool = me.getTool();

   		me.state.enabled = enabled;

        if(!me.__plugin && enabled) {
            me.__plugin = Oskari.clazz.create(tool.id, tool.config);
            me.__mapmodule.registerPlugin(me.__plugin);
        }

        if(enabled && enabled == true) {
            Oskari.clazz.create(tool.id, tool.config);
            me.__plugin.startPlugin(me.__sandbox);
        } else {
            me.__plugin.stopPlugin(me.__sandbox);
        }                
    },
    /**
    * Get extra options.
    * @method getExtraOptions
    * @public
    *
    * @returns {Object} jQuery element
    */
    getExtraOptions: function() {
    	return null;
    },
    /**
    * Get name.
    * @method getName
    * @public
    *
    * @returns {String} tool name
    */
    getName: function() {
    	return this.__loc[this.getTool().name];
    },
    /**
    * Is displayed in mode.
    * @method isDisplayedInMode
    * @public
    *
    * @param {String} mode the checked mode
    *
    * @returns {Boolean} is displayed in wanted mode
    */
    isDisplayedInMode: function(mode) {
    	return true;
    },
    /**
    * Is displayed.
    * @method isDisplayed
    * @public
    *
    * @returns {Boolean} is tool displayed
    */
    isDisplayed: function() {
    	return true;
    },
    /**
    * Set mode to.
    * @method setMode
    * @public
    *
    * @param {String} mode the mode
    */
    setMode: function(mode){
    	var me = this;
    	me.state.mode = mode;
    },
    /**
    * Get group
    * @method getGroup
    * @public
    *
    * @returns {String} group id
    */
    getGroup : function() {
    	return this.group;
    },
    /**
    * Get index
    * @method getIndex
    * @public
    *
    * @returns {Integer} index
    */
    getIndex : function() {
        return this.index;
    },
    /**
    * Get allowed locations
    * @method getAllowedLocations
    * @public
    *
    * @returns {Object} allowed locations array
    */
    getAllowedLocations: function() {
        return this.allowedLocations;
    },
    /**
    * Get values.
    * @method getValues
    * @public
    * 
    * @returns {Object} tool value object
    */
    getValues: function () {
    	// TODO: this needs more thinking
    	// tool should propably know where its config affects
    	// maybe return that kind of object
    	// mapfull.conf.plugins.push({id : this.getTool().id}) ???
    	return {
			tool: this.getTool().id,
			show: this.state.enabled,
			subTools : []
		};
    },
    /**
    * Validate tool.
    *
    * @returns {Object} errors object
    */
    validate: function() {
        // always valid
        return true;
    }
}); 