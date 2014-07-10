/* global define */
define([
	'mvc/Collection',
	'mvc/View',
	'SelectView'
], function (
	Collection,
	View,
	SelectView
) {
	'use strict';

	var LeagueView = function (options) {
		this._options = options;
		View.call(this, options);
	};

	LeagueView.prototype = Object.create(View.prototype);

	LeagueView.prototype._initialize = function () {
		var el = this._el;

		this._league = this._options.league;
		this._league.on('reset', this.render, this);

		el.innerHTML = '<section>' +
				'<div class="from"></div>' +
				'<div class="frompicks"></div>' +
			'</section>' +
			'<section>' +
				'<div class="to"></div>' +
				'<div class="topicks"></div>' +
			'</section>';

		var formatTeam = function (team) {
			return team.name +
					' (' + team.owner + ')';
		};

		this._from = new SelectView({
			collection: this._league,
			el: el.querySelector('.from'),
			format: formatTeam
		});
		this._to = new SelectView({
			collection: new Collection(),
			el: el.querySelector('.to'),
			format: formatTeam
		});

		this._from.on('select', this._onFromChange, this);
		this._to.on('select', this._onToChange, this);
		this._league.on('reset', function () {
			this._league.select(this._league.data()[0]);
		}.bind(this));
	};

	LeagueView.prototype._onFromChange = function () {
		var league = this._league.data(),
		    fromTeam = this._from._collection.getSelected(),
		    teams = [],
		    i, len, team;

		for (i=0, len = league.length; i < len; i++) {
			team = league[i];
			if (team !== fromTeam) {
				teams.push(team);
			}
		}
		this._to._collection.reset(teams);
		if (teams.length > 0) {
			this._to._collection.select(teams[0]);
		}

		// TODO: show from picks
		if (fromTeam) {
			this._el.querySelector('.frompicks').innerHTML = '' +
					fromTeam.name + ' picks';
			new SelectView({
				el: this._el.querySelector('.frompicks').appendChild(
						document.createElement('div')),
				// todo, use fromTeam picks collection
				collection: new Collection([
					{id: 1, name: 'Pick 1'},
					{id: 2, name: 'Pick 2'},
					{id: 3, name: 'Pick 3'},
					{id: 4, name: 'Pick 4'},
					{id: 5, name: 'Pick 5'},
					{id: 6, name: 'Pick 6'},
					{id: 7, name: 'Pick 7'},
					{id: 8, name: 'Pick 8'}
				]),
				format: function (pick) {
					return pick.name;
				},
				multiSelect: true
			});
		}

	};

	LeagueView.prototype._onToChange = function (team) {
		// TODO: show to picks
		this._el.querySelector('.topicks').innerHTML = '' +
				team.name + ' picks';
		if (team) {
			new SelectView({
				el: this._el.querySelector('.topicks').appendChild(
						document.createElement('div')),
				// todo, use fromTeam picks collection
				collection: new Collection([
					{id: 1, name: 'Pick 1'},
					{id: 2, name: 'Pick 2'},
					{id: 3, name: 'Pick 3'},
					{id: 4, name: 'Pick 4'},
					{id: 5, name: 'Pick 5'},
					{id: 6, name: 'Pick 6'},
					{id: 7, name: 'Pick 7'},
					{id: 8, name: 'Pick 8'}
				]),
				format: function (pick) {
					return pick.name;
				},
				multiSelect: true
			});
		}
	};


	LeagueView.prototype.render = function () {
	};


	return LeagueView;
});