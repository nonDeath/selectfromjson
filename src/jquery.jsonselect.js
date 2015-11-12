/**
 * [description]
 * <select name="my_select" id="my_select" class="any_decoration" data-empty-text="Select an option" data-url="some_json_resorce" data-parent="#some_parent_select">
 * </select>
 */
(function ($) {

var methods = {
    _reset: function(select) {
        var $self = select;
        $self
            .find('option')
            .remove()
            .end()
            .append($('<option>').val('').text($self.data('jsonselect').empty_text));
    },
    load: function(select) {

        var $self = select,
            $parent = null,
            params = $self.data('params');

        $parent = $($self.data('parent'));

        if ($parent.length) {
            params = $.extend(true, {}, params, {id: $parent.val()});
        }

        $.ajax({
            url: $self.data('url'),
            dataType: 'json',
            data: params,
            success: function(data, textStatus, jqXHR) {
                methods._reset($self);

                var options = $(data).map(function () {
                    var value = $self.data('value'),
                        text = $self.data('text');

                    $self.
                        append(
                            $('<option>').
                            val(this[value]).
                            text(this[text])
                    );
                });

                $.isFunction($self.data('jsonselect').events.success ) && $self.data('jsonselect').events.success.call($self, [data, textStatus, jqXHR]);
            },
            beforeSend: function() {
                $.isFunction($self.data('jsonselect').events.beforeSend ) && $self.data('jsonselect').events.beforeSend.call($self);
            },
            error: function(data, textStatus, jqXHR) {
                $.isFunction($self.data('jsonselect').events.error ) && $self.data('jsonselect').events.error.call($self, [data, textStatus, jqXHR]);
            }
        });
    }
};
// What does the jsonselect plugin do?
$.fn.jsonselect = function(options) {

    if (!this.length) {
        return this;
    }

    this.each(function() {
        var $this = $(this);

        if (!$this.is('select')) {
            $.error( 'Element ' +  $this.attr('name') + ' is not an select form control!' );
            return this;
        }

        options = $.extend({}, $.fn.jsonselect.defaults, options);

        $this.data('jsonselect', options);

        if ($this.data('parent')) {
            var parent = $($this.data('parent'));
            parent.bind('change', function (event) {;
                methods.load($this);
            });
        }

        if ($this.data('autoload')) {
            methods.load($this);
        }
    });

    return this;
};

// default options
$.fn.jsonselect.defaults = {
    selected: null,
    empty_text: 'Select an option',
    events: {
        success: null, // function(data, textStatus, jqXHR){ return this; }
        beforeSend: null, // function(data, textStatus, jqXHR){ return this; }
        error: null // function(data, textStatus, jqXHR){ return this; }
    }
};

}) (jQuery);