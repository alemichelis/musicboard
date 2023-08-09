$(() => {
    const map = $('#map').dxMap({
      provider: 'bing',
      zoom: 14,
      height: 440,
      width: '100%',
      controls: true,
      markers: [{
        location: '40.7825, -73.966111',
      }, {
        location: [40.755833, -73.986389],
      }, {
        location: { lat: 40.753889, lng: -73.981389 },
      }, {
        location: 'Brooklyn Bridge,New York,NY',
      },
      ],
      routes: [
        {
          weight: 6,
          color: 'blue',
          opacity: 0.5,
          mode: '',
          locations: [
            [40.782500, -73.966111],
            [40.755833, -73.986389],
            [40.753889, -73.981389],
            'Brooklyn Bridge,New York,NY',
          ],
  
        },
      ],
    }).dxMap('instance');
  
    $('#choose-mode').dxSelectBox({
      dataSource: ['driving', 'walking'],
      value: 'driving',
      onValueChanged(data) {
        map.option('routes', [$.extend({}, map.option('routes')[0], {
          mode: data.value,
        })]);
      },
    });
  
    $('#choose-color').dxSelectBox({
      dataSource: ['blue', 'green', 'red'],
      value: 'blue',
      onValueChanged(data) {
        map.option('routes', [$.extend({}, map.option('routes')[0], {
          color: data.value,
        })]);
      },
    });
  });
  
  $(() => {
    $('.scheduler').dxScheduler({
      timeZone: 'America/Los_Angeles',
      dataSource: data,
      views: ['month'],
      currentView: 'month',
      currentDate: new Date(2021, 5, 2, 11, 30),
      firstDayOfWeek: 1,
      startDayHour: 8,
      endDayHour: 18,
      showAllDayPanel: false,
      height: 600,
      groups: ['employeeID'],
      resources: [
        {
          fieldExpr: 'employeeID',
          allowMultiple: false,
          dataSource: employees,
          label: 'Employee',
        },
      ],
      dataCellTemplate(cellData, index, container) {
        const { employeeID } = cellData.groups;
        const currentTraining = getCurrentTraining(cellData.startDate.getDate(), employeeID);
  
        const wrapper = $('<div>')
          .toggleClass(`employee-weekend-${employeeID}`, isWeekEnd(cellData.startDate)).appendTo(container)
          .addClass(`employee-${employeeID}`)
          .addClass('dx-template-wrapper');
  
        wrapper.append($('<div>')
          .text(cellData.text)
          .addClass(currentTraining)
          .addClass('day-cell'));
      },
      resourceCellTemplate(cellData) {
        const name = $('<div>')
          .addClass('name')
          .css({ backgroundColor: cellData.color })
          .append($('<h2>')
            .text(cellData.text));
  
        const avatar = $('<div>')
          .addClass('avatar')
          .html(`<img src=${cellData.data.avatar}>`)
          .attr('title', cellData.text);
  
        const info = $('<div>')
          .addClass('info')
          .css({ color: cellData.color })
          .html(`Age: ${cellData.data.age}<br/><b>${cellData.data.discipline}</b>`);
  
        return $('<div>').append([name, avatar, info]);
      },
    });
  
    function isWeekEnd(date) {
      const day = date.getDay();
      return day === 0 || day === 6;
    }
  
    function getCurrentTraining(date, employeeID) {
      const result = (date + employeeID) % 3;
      const currentTraining = `training-background-${result}`;
  
      return currentTraining;
    }
  });
  

  // calendario

  $(() => {
    const msInDay = 1000 * 60 * 60 * 24;
    const zoomLevels = ['month', 'year', 'decade', 'century'];
    const weekDays = [
      { id: 0, text: 'Sunday' },
      { id: 1, text: 'Monday' },
      { id: 2, text: 'Tuesday' },
      { id: 3, text: 'Wednesday' },
      { id: 4, text: 'Thursday' },
      { id: 5, text: 'Friday' },
      { id: 6, text: 'Saturday' },
    ];
    const weekNumberRules = ['auto', 'firstDay', 'firstFourDays', 'fullWeek'];
    const date = new Date().getTime();
  
    const calendar = $('#calendar').dxCalendar({
      value: new Date(),
      disabled: false,
      firstDayOfWeek: 0,
      showWeekNumbers: false,
      weekNumberRule: 'auto',
      zoomLevel: zoomLevels[0],
      onValueChanged(data) {
        selectedDate.option('value', data.value);
      },
      onOptionChanged(data) {
        if (data.name === 'zoomLevel') {
          zoomLevel.option('value', data.value);
        }
      },
    }).dxCalendar('instance');
  
    $('#min-date').dxCheckBox({
      text: 'Set minimum date',
      onValueChanged(data) {
        const minDate = new Date(date - msInDay * 3);
  
        calendar.option('min', data.value ? minDate : null);
        selectedDate.option('min', data.value ? minDate : null);
      },
    });
  
    $('#max-date').dxCheckBox({
      text: 'Set maximum date',
      onValueChanged(data) {
        const maxDate = new Date(date + msInDay * 3);
  
        calendar.option('max', data.value ? maxDate : null);
        selectedDate.option('max', data.value ? maxDate : null);
      },
    });
  
    $('#disable-dates').dxCheckBox({
      text: 'Disable weekends',
      onValueChanged(data) {
        if (data.value) {
          calendar.option('disabledDates', (d) => d.view === 'month' && isWeekend(d.date));
        } else {
          calendar.option('disabledDates', null);
        }
      },
    });
  
    $('#week-numbers').dxCheckBox({
      text: 'Show week numbers',
      onValueChanged(data) {
        calendar.option('showWeekNumbers', data.value);
      },
    });
  
    $('#disabled').dxCheckBox({
      text: 'Disable the calendar',
      onValueChanged(data) {
        calendar.option('disabled', data.value);
      },
    });
  
    $('#custom-cell').dxCheckBox({
      text: 'Use custom cell template',
      value: false,
      onValueChanged(data) {
        calendar.option('cellTemplate', data.value ? getCellTemplate : 'cell');
      },
    });
  
    const zoomLevel = $('#zoom-level').dxSelectBox({
      dataSource: zoomLevels,
      value: zoomLevels[0],
      inputAttr: { 'aria-label': 'Zoom Level' },
      onValueChanged(data) {
        calendar.option('zoomLevel', data.value);
      },
    }).dxSelectBox('instance');
  
    const selectedDate = $('#selected-date').dxDateBox({
      value: new Date(),
      inputAttr: { 'aria-label': 'Date' },
      onValueChanged(data) {
        calendar.option('value', data.value);
      },
    }).dxDateBox('instance');
  
    $('#first-day-of-week').dxSelectBox({
      dataSource: weekDays,
      value: 0,
      valueExpr: 'id',
      inputAttr: { 'aria-label': 'First Day of Week' },
      displayExpr: 'text',
      onValueChanged(data) {
        calendar.option('firstDayOfWeek', data.value);
      },
    });
  
    $('#week-number-rule').dxSelectBox({
      dataSource: weekNumberRules,
      value: weekNumberRules[0],
      inputAttr: { 'aria-label': 'Week Number Rule' },
      onValueChanged(data) {
        calendar.option('weekNumberRule', data.value);
      },
    });
  
    const holidays = [[1, 0], [4, 6], [25, 11]];
  
    function isWeekend(d) {
      const day = d.getDay();
  
      return day === 0 || day === 6;
    }
  
    function getCellTemplate(data) {
      let cssClass = '';
  
      if (data.view === 'month') {
        if (!data.date) {
          cssClass = 'week-number';
        } else {
          if (isWeekend(data.date)) { cssClass = 'weekend'; }
  
          $.each(holidays, (_, item) => {
            if (data.date.getDate() === item[0] && data.date.getMonth() === item[1]) {
              cssClass = 'holiday';
              return false;
            }
            return true;
          });
        }
      }
  
      return `<span class='${cssClass}'>${data.text}</span>`;
    }
  });
  