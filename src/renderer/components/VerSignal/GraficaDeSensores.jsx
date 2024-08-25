/* eslint-disable react/prop-types */
import Plot from 'react-plotly.js';

const GraficaDeSensores = ({ dataArr, gridLayout }) => {
  return (
    <Plot
      data={dataArr}
      layout={{
        title: `Signals from`,
        autosize: true,
        grid: gridLayout,
        xaxis: {
          title: 'Time (seconds)',
          side: 'bottom',
        },
        yaxis: {
          title: 'Amplitude',
          side: 'bottom',
        },
        xaxis2: {
          title: 'Time (seconds)',
          side: 'bottom',
        },
        yaxis2: {
          title: 'Amplitude',
          side: 'bottom',
        },
        xaxis3: {
          title: 'Time (seconds)',
          side: 'bottom',
        },
        yaxis3: {
          title: 'Amplitude',
          side: 'bottom',
        },
        xaxis4: {
          title: 'Time (seconds)',
          side: 'bottom',
        },
        yaxis4: {
          title: 'Amplitude',
          side: 'bottom',
        },
        xaxis5: {
          title: 'Time (seconds)',
          side: 'bottom',
        },
        yaxis5: {
          title: 'Amplitude',
          side: 'bottom',
        },
        xaxis6: {
          title: 'Time (seconds)',
          side: 'bottom',
        },
        yaxis6: {
          title: 'Amplitude',
          side: 'bottom',
        },
        xaxis7: {
          title: 'Time (seconds)',
          side: 'bottom',
        },
        yaxis7: {
          title: 'Amplitude',
          side: 'bottom',
        },
        xaxis8: {
          title: 'Time (seconds)',
          side: 'bottom',
        },
        yaxis8: {
          title: 'Amplitude',
          side: 'bottom',
        },
      }}
      config={{ scrollZoom: true, displaylogo: false }}
      useResizeHandler
      style={{ height: '100%', width: '100%' }}
    />
  );
};

export default GraficaDeSensores;
