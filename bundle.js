(function (React, ReactDOM, d3) {
  'use strict';

  var React__default = 'default' in React ? React['default'] : React;
  ReactDOM = ReactDOM && Object.prototype.hasOwnProperty.call(ReactDOM, 'default') ? ReactDOM['default'] : ReactDOM;

  const width = window.innerWidth;
  const height = window.innerHeight;
  const margin = {
    top: 20,
    bottom: 20,
    right: 20,
    left: 200,
  };
  const csvUrl =
    'https://gist.githubusercontent.com/mbdev3/5afb40dbdcd3d75d69dd38b9d61bbb11/raw/3b771570b7278d39e8c6c54148a2ac602019e09b/wpp2020.csv';

  const App = () => {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
      const row = (d) => {
        d.population = +d['2020'];
        return d;
      };
      d3.csv(csvUrl, row).then((data) => {
        setData(data.slice(0, 10));
      });
    }, []);

    if (!data) {
      return React__default.createElement( 'pre', null, "loading.." );
    }

    const innerHeight =
      height - margin.top - margin.bottom;
    const innerWidth =
      width - margin.right - margin.left;
    const yScale = d3.scaleBand()
      .domain(data.map((d) => d.country))
      .range([0, innerHeight]);
    const xScale = d3.scaleLinear()
      .domain([0, d3.max(data, (d) => d.population)])
      .range([0, innerWidth]);
    const dy = innerHeight /data.length /2;
    console.log(dy);
    return (
      React__default.createElement( 'svg', { width: width, height: height },
        React__default.createElement( 'g', {
          transform: `translate(${margin.left},${margin.top})` },
          xScale.ticks().map((tickValue) => (
            React__default.createElement( 'g', { key: tickValue, transform: `translate(${xScale(
              tickValue
            )},0)` },
              React__default.createElement( 'line', {
                y2: innerHeight, stroke: "black" }),
              React__default.createElement( 'text', {
                style: { textAnchor: 'middle' }, y: innerHeight + 5, dy: "0.71rem" },
                tickValue
              )
            )
          )),
          yScale.domain().map((tickValue) => (
            
              
              React__default.createElement( 'text', {
                key: tickValue, style: { textAnchor: 'end' }, x: -5, dy: ".32em", y: yScale(tickValue)+yScale.bandwidth()/2 },
                tickValue
              )
            
          )),
          data.map((d) => (
            React__default.createElement( 'rect', {
              key: d.country, x: 0, y: yScale(d.country), width: xScale(d.population), height: yScale.bandwidth() })
          ))
        )
      )
    );
  };

  const rootElement = document.getElementById(
    'root'
  );
  ReactDOM.render(React__default.createElement( App, null ), rootElement);

}(React, ReactDOM, d3));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge1xuICB1c2VTdGF0ZSxcbiAgdXNlQ2FsbGJhY2ssXG4gIHVzZUVmZmVjdCxcbn0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQge1xuICBjc3YsXG4gIGFyYyxcbiAgcGllLFxuICBzY2FsZUJhbmQsXG4gIHNjYWxlTGluZWFyLFxuICBtYXgsXG59IGZyb20gJ2QzJztcblxuY29uc3Qgd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbmNvbnN0IGhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbmNvbnN0IG1hcmdpbiA9IHtcbiAgdG9wOiAyMCxcbiAgYm90dG9tOiAyMCxcbiAgcmlnaHQ6IDIwLFxuICBsZWZ0OiAyMDAsXG59O1xuY29uc3QgY3N2VXJsID1cbiAgJ2h0dHBzOi8vZ2lzdC5naXRodWJ1c2VyY29udGVudC5jb20vbWJkZXYzLzVhZmI0MGRiZGNkM2Q3NWQ2OWRkMzhiOWQ2MWJiYjExL3Jhdy8zYjc3MTU3MGI3Mjc4ZDM5ZThjNmM1NDE0OGEyYWM2MDIwMTllMDliL3dwcDIwMjAuY3N2JztcblxuY29uc3QgQXBwID0gKCkgPT4ge1xuICBjb25zdCBbZGF0YSwgc2V0RGF0YV0gPSB1c2VTdGF0ZShudWxsKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHJvdyA9IChkKSA9PiB7XG4gICAgICBkLnBvcHVsYXRpb24gPSArZFsnMjAyMCddO1xuICAgICAgcmV0dXJuIGQ7XG4gICAgfTtcbiAgICBjc3YoY3N2VXJsLCByb3cpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgIHNldERhdGEoZGF0YS5zbGljZSgwLCAxMCkpO1xuICAgIH0pO1xuICB9LCBbXSk7XG5cbiAgaWYgKCFkYXRhKSB7XG4gICAgcmV0dXJuIDxwcmU+bG9hZGluZy4uPC9wcmU+O1xuICB9XG5cbiAgY29uc3QgaW5uZXJIZWlnaHQgPVxuICAgIGhlaWdodCAtIG1hcmdpbi50b3AgLSBtYXJnaW4uYm90dG9tO1xuICBjb25zdCBpbm5lcldpZHRoID1cbiAgICB3aWR0aCAtIG1hcmdpbi5yaWdodCAtIG1hcmdpbi5sZWZ0O1xuICBjb25zdCB5U2NhbGUgPSBzY2FsZUJhbmQoKVxuICAgIC5kb21haW4oZGF0YS5tYXAoKGQpID0+IGQuY291bnRyeSkpXG4gICAgLnJhbmdlKFswLCBpbm5lckhlaWdodF0pO1xuICBjb25zdCB4U2NhbGUgPSBzY2FsZUxpbmVhcigpXG4gICAgLmRvbWFpbihbMCwgbWF4KGRhdGEsIChkKSA9PiBkLnBvcHVsYXRpb24pXSlcbiAgICAucmFuZ2UoWzAsIGlubmVyV2lkdGhdKTtcbiAgY29uc3QgZHkgPSBpbm5lckhlaWdodCAvZGF0YS5sZW5ndGggLzJcbiAgY29uc29sZS5sb2coZHkpXG4gIHJldHVybiAoXG4gICAgPHN2ZyB3aWR0aD17d2lkdGh9IGhlaWdodD17aGVpZ2h0fT5cbiAgICAgIDxnXG4gICAgICAgIHRyYW5zZm9ybT17YHRyYW5zbGF0ZSgke21hcmdpbi5sZWZ0fSwke21hcmdpbi50b3B9KWB9XG4gICAgICA+XG4gICAgICAgIHt4U2NhbGUudGlja3MoKS5tYXAoKHRpY2tWYWx1ZSkgPT4gKFxuICAgICAgICAgIDxnIGtleSA9e3RpY2tWYWx1ZX1cbiAgICAgICAgICAgIHRyYW5zZm9ybT17YHRyYW5zbGF0ZSgke3hTY2FsZShcbiAgICAgICAgICAgICAgdGlja1ZhbHVlXG4gICAgICAgICAgICApfSwwKWB9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGxpbmVcbiAgICAgICAgICAgICAgeTI9e2lubmVySGVpZ2h0fVxuICAgICAgICAgICAgICBzdHJva2U9XCJibGFja1wiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPHRleHRcbiAgICAgICAgICAgICAgc3R5bGU9e3sgdGV4dEFuY2hvcjogJ21pZGRsZScgfX1cbiAgICAgICAgICAgICAgeT17aW5uZXJIZWlnaHQgKyA1fVxuICAgICAgICAgICAgICBkeT1cIjAuNzFyZW1cIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7dGlja1ZhbHVlfVxuICAgICAgICAgICAgPC90ZXh0PlxuICAgICAgICAgIDwvZz5cbiAgICAgICAgKSl9XG4gICAgICAgIHt5U2NhbGUuZG9tYWluKCkubWFwKCh0aWNrVmFsdWUpID0+IChcbiAgICAgICAgICBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgPHRleHRcbiAgICAgICAgICAgICAga2V5ID17dGlja1ZhbHVlfVxuICAgICAgICAgICAgICBzdHlsZT17eyB0ZXh0QW5jaG9yOiAnZW5kJyB9fVxuICAgICAgICAgICAgICB4PXstNX1cbiAgICAgICAgICAgIFx0ZHk9XCIuMzJlbVwiXG4gICAgICAgICAgICAgXG4gICAgICAgICAgICAgeSA9IHt5U2NhbGUodGlja1ZhbHVlKSt5U2NhbGUuYmFuZHdpZHRoKCkvMn1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge3RpY2tWYWx1ZX1cbiAgICAgICAgICAgIDwvdGV4dD5cbiAgICAgICAgICBcbiAgICAgICAgKSl9XG4gICAgICAgIHtkYXRhLm1hcCgoZCkgPT4gKFxuICAgICAgICAgIDxyZWN0XG4gICAgICAgICAgICBrZXkgPXtkLmNvdW50cnl9XG4gICAgICAgICAgICB4PXswfVxuICAgICAgICAgICAgeT17eVNjYWxlKGQuY291bnRyeSl9XG4gICAgICAgICAgICB3aWR0aD17eFNjYWxlKGQucG9wdWxhdGlvbil9XG4gICAgICAgICAgICBoZWlnaHQ9e3lTY2FsZS5iYW5kd2lkdGgoKX1cbiAgICAgICAgICAvPlxuICAgICAgICApKX1cbiAgICAgIDwvZz5cbiAgICA8L3N2Zz5cbiAgKTtcbn07XG5cbmNvbnN0IHJvb3RFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gICdyb290J1xuKTtcblJlYWN0RE9NLnJlbmRlcig8QXBwIC8+LCByb290RWxlbWVudCk7XG4iXSwibmFtZXMiOlsidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJjc3YiLCJSZWFjdCIsInNjYWxlQmFuZCIsInNjYWxlTGluZWFyIiwibWF4Il0sIm1hcHBpbmdzIjoiOzs7Ozs7RUFlQSxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDO0VBQ2hDLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7RUFDbEMsTUFBTSxNQUFNLEdBQUc7RUFDZixFQUFFLEdBQUcsRUFBRSxFQUFFO0VBQ1QsRUFBRSxNQUFNLEVBQUUsRUFBRTtFQUNaLEVBQUUsS0FBSyxFQUFFLEVBQUU7RUFDWCxFQUFFLElBQUksRUFBRSxHQUFHO0VBQ1gsQ0FBQyxDQUFDO0VBQ0YsTUFBTSxNQUFNO0VBQ1osRUFBRSxxSUFBcUksQ0FBQztBQUN4STtFQUNBLE1BQU0sR0FBRyxHQUFHLE1BQU07RUFDbEIsRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxHQUFHQSxjQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDekM7RUFDQSxFQUFFQyxlQUFTLENBQUMsTUFBTTtFQUNsQixJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxLQUFLO0VBQ3ZCLE1BQU0sQ0FBQyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztFQUNoQyxNQUFNLE9BQU8sQ0FBQyxDQUFDO0VBQ2YsS0FBSyxDQUFDO0VBQ04sSUFBSUMsTUFBRyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUs7RUFDcEMsTUFBTSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztFQUNqQyxLQUFLLENBQUMsQ0FBQztFQUNQLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNUO0VBQ0EsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFO0VBQ2IsSUFBSSxPQUFPQywyQ0FBSyxXQUFTLEVBQU0sQ0FBQztFQUNo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