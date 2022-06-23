let chart

JSC.fetch('./res/data.csv')
  .then(function(response) {
    return response.text();
  })
  .then(function(text) {
    const data = JSC.csv2Json(text)
    chart = renderChart(makeSeries(data));
  });

function renderChart(series) {
  return JSC.chart('chartDiv', {
    title_label: {
      style_fontSize: 16,
      text:
        'Magic Quadrant for Analytics and Business Intelligence Platforms 2019'
    },
    legend_visible: false,
    annotations: [
      {
        label_text: 'Challengers',
        position: 'inside top left'
      },
      {
        label_text: 'Leaders',
        position: 'inside top right'
      },
      {
        label_text: 'Niche Players',
        position: 'inside bottom left'
      },
      {
        label_text: 'Visionaries',
        position: 'inside bottom right'
      }
    ],
    defaultAnnotation: {
      label_style: {
        fontWeight: 'bold',
        fontSize: 14
      },
      margin: [5, 100]
    },
    defaultAxis: {
      defaultTick_enabled: false,
      line_caps_end: {
        type: 'arrow',
        size: '800%'
      },
      markers: [
        {
          value: 50,
          line: { width: 2, color: '#e0e0e0' }
        }
      ]
    },
    yAxis: {
      label_text: 'Ability to Execute',
      alternateGridFill: 'none',
      scale_range: [0, 100]
    },
    xAxis: {
      label_text: 'Completeness of Vision',
      scale_range: [0, 100]
    },
    defaultSeries_mouseTracking_enabled: false,
    defaultPoint: {
      marker_type: 'circle',
      label_text: '%vendor'
    },
    series: series
  });
}

function makeSeries(data) {
  return [
    {
      //This series renders the quadrants. 
      type: 'column',
      mouseTracking_enabled: false,
      defaultPoint: {
        opacity: 0.1,
        label_visible: false
      },
      points: [
        {
          x: [0, 50],
          y: [50, 100],
          color: '#ffd54f'
        },
        {
          x: [50, 100],
          y: [50, 100],
          color: '#29b6f6'
        },
        {
          x: [0, 50],
          y: [0, 50],
          color: '#ef5350'
        },
        {
          x: [50, 100],
          y: [0, 50],
          color: '#66bb6a'
        }
      ]
    },
    {
      name: 'GDP',
      type: 'marker',
      points: data.map(function(item) {
        const result = {
          x: item.x,
          y: item.y,
          attributes_vendor: item.vendor,
        }
        if (item.x <= 50 && item.y >= 50) {
          result.color = '#ffd54f';
        }
        if (item.x >= 50 && item.y >= 50) {
          result.color = '#29b6f6';
        }
        if (item.x <= 50 && item.y <= 50) {
          result.color = '#ef5350';
        }
        if (item.x >= 50 && item.y <= 50) {
          result.color = '#66bb6a';
        }
        return result;
      })
    }
  ];
} 
