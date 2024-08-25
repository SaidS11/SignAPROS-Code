import Plot from "react-plotly.js";

interface SensoresAdquisicionInterface {
    gridLayout: any
    dataArr: any
}

const SensoresAdquisicionGraficar = (props: SensoresAdquisicionInterface) => {
 
    const { gridLayout, dataArr } = props;

    const layout2 = {
      title: `Graphs`,
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
    };
    return (
        <Plot
        data={dataArr}
        layout={{
            title: `Graphs`,
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
      // layout={layout2}
      config={{ scrollZoom: true, displaylogo: false }}
      useResizeHandler
      style={{ height: '100%', width: '100%' }}
    />
    );
  };
  
  export default SensoresAdquisicionGraficar;