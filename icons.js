/* Local SVGs: no network requests or changes to saved inventory data. */
window.inventoryIcon = (function () {
  var paths = {
    box: '<path d="m3 7 9-4 9 4-9 4-9-4Zm0 0v10l9 4 9-4V7M12 11v10M7 5l10 4"/>',
    bread: '<path d="M5 19V10C1 9 3 4 7 4h10c4 0 6 5 2 6v9H5Z"/><path d="m9 7-1 3m5-3-1 3m5-3-1 3"/>',
    fries: '<path d="m5 10 2 11h10l2-11H5ZM7 10V3h3v7m1 0V2h3v8m1 0V5h3v5"/>',
    meat: '<path d="M14 3c5-1 8 3 6 7-2 3-5 3-6 6s-6 6-9 3-1-7 2-9 3-6 7-7Z"/><path d="M14 7c2-2 5 0 3 2s-5 0-3-2Z"/>',
    cheese: '<path d="m3 11 12-7c3 1 5 4 6 7H3Zm0 0v9h18v-4a2 2 0 0 1 0-4v-1M7 15h.01M13 17h.01M15 13h.01"/>',
    milk: '<path d="M8 3h8v4l3 4v10H5V11l3-4V3Zm0 4h8M5 11h14M9 15h6v3H9z"/>',
    snow: '<path d="M12 2v20M3.3 7l17.4 10M3.3 17 20.7 7M9 4l3 3 3-3M9 20l3-3 3 3M3 11l4-1-1-4m12 0-1 4 4 1M3 13l4 1-1 4m12 0-1-4 4-1"/>',
    bottle: '<path d="M9 3h6v4l3 5v9H6v-9l3-5V3Zm0 4h6M6 14h12M10 17h4"/>',
    sauce: '<path d="M11 2h2l1 5H10l1-5ZM8 7h8v4l2 3v7H6v-7l2-3V7ZM6 15h12"/>',
    pizza: '<path d="m3 4 6 17L21 8C16 3 9 1 3 4Zm1 3c5-2 10 0 14 4M9 10h.01M10 15h.01M14 11h.01"/>',
    leaf: '<path d="M20 3C8 2 2 7 5 15s16 5 15-12ZM4 21 16 8M10 15l-1-5m1 5 5 1"/>',
    tomato: '<path d="M12 8C3 2 1 17 8 20c3 2 10 1 12-5s-3-10-8-7Z"/><path d="M12 8V3m-4 2 4 3 4-3M7 12c-1 1-1 3 0 4"/>',
    onion: '<path d="M10 3h4l-1 4c2 4 7 4 7 9 0 7-16 7-16 0 0-5 5-5 7-9l-1-4ZM11 8c-4 6-4 10 1 13m1-13c4 6 4 10-1 13"/>',
    mushroom: '<path d="M3 13a9 9 0 0 1 18 0H3Zm7 0-1 8h6l-1-8M8 8h.01M15 7h.01M17 10h.01"/>',
    fish: '<path d="M4 12c5-10 12-8 16-5v10c-4 3-11 5-16-5Zm0 0L1 8v8l3-4ZM15 6c-3 4-3 8 0 12M16 10h.01"/>',
    egg: '<path d="M20 14c0 10-16 10-16 0C4 9 9 2 12 2s8 7 8 12Z"/>',
    drink: '<path d="M6 8h12l-2 13H8L6 8Zm0 5h12M12 8l2-6h4"/>',
    coffee: '<path d="M4 9h12v7a5 5 0 0 1-10 0V9Zm12 1h2a3 3 0 0 1 0 6h-2M4 22h14M8 2v3m5-3v3"/>',
    receipt: '<path d="M5 3h14v18l-3-2-4 2-4-2-3 2V3Zm4 5h6m-6 4h6m-6 4h3"/>',
    chef: '<path d="M7 14c-7-2-4-10 1-8 1-5 7-5 8 0 5-2 8 6 1 8v7H7v-7Zm0 3h10"/>',
    search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
    edit: '<path d="m15 4 5 5M4 20l5-1L21 7l-5-5L4 14v6Z"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    chevron: '<path d="m6 9 6 6 6-6"/>',
    message: '<path d="M21 11a9 9 0 0 1-9 9H3l2-5a9 9 0 1 1 16-4ZM8 9h8m-8 4h5"/>',
    close: '<path d="m6 6 12 12M6 18 18 6"/>'
  };
  var rules = [
    [/patat|fries/, 'fries'], [/pane|panin|bun|focacc|piadin/, 'bread'],
    [/mozzarella|formagg|cheddar|provol|scamor|latticin|grana|parmig|gorgonz|burrata|stracch/, 'cheese'],
    [/latte|panna|yogurt/, 'milk'], [/pomodor|ketchup/, 'tomato'],
    [/cipoll|aglio/, 'onion'], [/fungh|champignon/, 'mushroom'],
    [/insalat|rucola|lattuga|verd|spinac|basil|zucchin|melanz|peperon|cetriol/, 'leaf'],
    [/carne|hamburger|pollo|manzo|suino|maiale|bacon|pancetta|prosciutt|salame|salsic|wurstel|speck|mortadella|bresaola|tacchino/, 'meat'],
    [/pesce|tonno|salmone|acciug|gamber|calamar/, 'fish'], [/uov|uovo/, 'egg'],
    [/sals|maiones|senap|bbq|barbecue/, 'sauce'], [/olio|acet|spezi|sale|pepe|origano/, 'bottle'],
    [/pizz|farin|lievit|impast/, 'pizza'], [/surgel|congel|ghiacc/, 'snow'],
    [/caffe|cappucc|espresso/, 'coffee'], [/acqua|bevande|birr|cola|fanta|sprite|succo|vino|bibit/, 'drink'],
    [/cass|scontrin|monet|banconot/, 'receipt']
  ];
  function find(name) {
    var normalized = String(name || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    for (var i = 0; i < rules.length; i++) if (rules[i][0].test(normalized)) return rules[i][1];
    return null;
  }
  return function (name, category) {
    var key = paths[name] ? name : find(name) || find(category) || 'box';
    return '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + paths[key] + '</svg>';
  };
})();
