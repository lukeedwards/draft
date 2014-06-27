/* global define */
define([
	'mvc/View'
], function (
	View
) {
	'use strict';

	var TeamsView = function (options) {
		this._options = options;
		View.call(this, options);
	};

	TeamsView.prototype = Object.create(View.prototype);

	TeamsView.prototype._initialize = function () {
		var options = this._options;
		this._teams = options.league;
		this._team = options.team;

		this._select = this._el.appendChild(document.createElement('select'));
		this._select.addEventListener('change', this._onSelect.bind(this));

		this._teams.on('reset', this.render, this);
		this._teams.on('select', this.trigger.bind(this, 'select'));

		this.render();
	};

	TeamsView.prototype.render = function () {
		var league = this._teams.data(),
			thisTeam = this._team,
			i, len, team,
			buf = [];

		for (i=0, len = league.length; i < len; i++) {
			team = league[i];
			if (team !== thisTeam) {
				buf.push(
					'<option value="', i, '">',
						team.name,
						' (', team.owner, ')',
					'</option>');
			}
		}
		this._select.innerHTML = buf.join('');
	};

	TeamsView.prototype._onSelect = function (e) {
		var index = e.target.value,
			selected = this._teams.data()[index];

		this._teams.select(selected);
	};


	return TeamsView;

});

