import Plot from 'react-plotly.js';

const PlotP = ({
  dataArr,
  selectedPatients,
  currentIteration,
  storeSelections,
  gridLayout,
  allSelections,
  clickSelection,
}) => {

  return (
    <Plot
      data={dataArr}
      layout={{
        title: `Characterize the record of: \n${selectedPatients[currentIteration].col1}`,
        // dragmode: 'select',
        // title: `Caracterizar el registro de: ***** ***** ****`,

        autosize: true,
        grid: gridLayout,
        hovermode:'closest',
        xaxis: { showgrid: false }, // Remove grid lines for x-axis
        yaxis: { showgrid: false }, // Remove grid lines for y-axis
        shapes: allSelections
          ? allSelections.flatMap((x) =>
              x.selections
                ? { ...x.selections[0], line: { dash: 'solid' } }
                : []
            )
          : undefined,
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
      style={{ height: '1000px', width: '100%' }}
      onSelected={(selectedWindow) => storeSelections(selectedWindow)}
      onClick={(selectedWindow) => clickSelection(selectedWindow)}
      
    />
  );
};

export default PlotP;
