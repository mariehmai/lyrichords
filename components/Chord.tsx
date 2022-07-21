import * as React from 'react';
import cn from 'classnames';

enum GuitarString {
  'E',
  'A',
  'D',
  'G',
  'B',
  'E2',
}

type AnnotationType = 'O' | 'X';

const gridOrigin = {
  offsetX: 20,
  offsetY: 36,
  lengthString: 140,
  lengthFret: 136,
};

type FretProps = {
  x: number;
  y: number;
  lengthString?: number;
  lengthFret?: number;
};

function Fret({
  x = gridOrigin.offsetX,
  y = gridOrigin.offsetY,
  lengthString = gridOrigin.offsetX,
  lengthFret = gridOrigin.lengthFret,
}: FretProps) {
  return (
    <path
      fill="none"
      stroke="#444444"
      d={`M${x},${y}L${lengthString},${lengthFret}`}
      style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)' }}
    ></path>
  );
}

const guitarFrets: FretProps[] = Array(6)
  .fill({
    x: gridOrigin.offsetX,
    y: gridOrigin.offsetY,
    lengthString: gridOrigin.offsetX,
    lengthFret: gridOrigin.lengthFret,
  })
  .reduce((previous, current, idx) => {
    if (idx === 0) return [current];
    const gap = previous[idx - 1].x + 30;
    return [...previous, { ...current, x: gap, lengthString: gap }];
  }, []);

const guitarStrings: FretProps[] = Array(6)
  .fill({
    x: gridOrigin.offsetX,
    y: gridOrigin.offsetY,
    lengthString: gridOrigin.lengthString,
    lengthFret: gridOrigin.offsetY,
  })
  .reduce((previous, current, idx) => {
    if (idx === 0) return [current];
    const gap = previous[idx - 1].y + 20;
    return [...previous, { ...current, y: gap, lengthFret: gap }];
  }, []);

function Grid() {
  return (
    <>
      {guitarFrets.map((fret, idx) => (
        <Fret key={idx} {...fret} />
      ))}
      {guitarStrings.map((string, idx) => (
        <Fret key={idx} {...string} />
      ))}
      <rect
        x="16"
        y={gridOrigin.offsetY}
        width="4"
        height={gridOrigin.lengthFret - gridOrigin.offsetY}
        rx="0"
        ry="0"
        fill="#444444"
        stroke="#444444"
        style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)' }}
      ></rect>
    </>
  );
}

type StringAnnotationProps = {
  position: GuitarString;
  type: AnnotationType;
};

function StringAnnotation({ position = 0, type }: StringAnnotationProps) {
  return (
    <>
      {type === 'X' && (
        <>
          <path
            fill="none"
            stroke="#444444"
            d={`M1,${guitarStrings[position].y - 5}L11,${
              guitarStrings[position].y + 5
            }`}
            className="string-annotation"
            style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)' }}
          ></path>
          <path
            fill="none"
            stroke="#444444"
            d={`M11,${guitarStrings[position].y - 5}L1,${
              guitarStrings[position].y + 5
            } `}
            className="string-annotation"
            style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)' }}
          ></path>
        </>
      )}
      {type === 'O' && (
        <circle
          cx="6"
          cy={guitarStrings[position].y}
          r="5"
          fill="none"
          stroke="#444444"
          className="string-annotation"
          style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)' }}
        ></circle>
      )}
    </>
  );
}

function FretStartNumber({ fret }: { fret: number }) {
  return (
    <>
      <text
        x="33.5"
        y="154"
        textAnchor="middle"
        fontSize="16px"
        stroke="none"
        fill="#444444"
        style={{
          WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
        }}
        className="fret-start-number"
      >
        <tspan style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)' }} dy="5.5">
          {fret}
        </tspan>
      </text>
    </>
  );
}

type FingerPositionProps = {
  strings: string[];
  fingers: string[];
};

function FingerPosition({ strings, fingers }: FingerPositionProps) {
  const reverseIdx = strings.length - 1;
  return (
    <>
      {strings.map((str, idx) => {
        if (['X', 'O'].includes(str) || str === '0') return null;

        const x = guitarFrets[parseInt(strings[idx])].x - 15;
        const y = guitarStrings[reverseIdx - idx].y;
        const finger = fingers[idx];

        return (
          <React.Fragment key={idx}>
            <circle
              cx={x}
              cy={y}
              r="8"
              fill={cn({
                'rgb(17 94 89)': finger === '1',
                'rgb(15 118 110)': finger === '2',
                'rgb(13 148 136)': finger === '3',
                'rgb(20 184 166)': finger === '4',
              })}
              stroke="none"
              className="finger-position-shape bg-teal-800"
              style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)' }}
            ></circle>
            <text
              x={x}
              y={y}
              textAnchor="middle"
              fontSize="10px"
              stroke="none"
              fill="#ffffff"
              style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)' }}
              className="finger-position-label"
            >
              <tspan
                style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)' }}
                dy="3.5000007629394503"
              >
                {finger}
              </tspan>
            </text>
          </React.Fragment>
        );
      })}
    </>
  );
}

function ChordNamePart({ chord }: { chord: string }) {
  const [main, tone, num] = chord.split(',');
  return (
    <>
      <text
        x="22"
        y="14"
        textAnchor="start"
        fontSize="20px"
        stroke="none"
        fill="#444444"
        style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)' }}
        className="chord-name-part"
      >
        <tspan
          style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)' }}
          dy="7.25"
        >
          {main}
        </tspan>
      </text>
      <text
        x="37"
        y="15"
        textAnchor="start"
        fontSize="16px"
        stroke="none"
        fill="#444444"
        style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)' }}
        className="chord-name-part"
      >
        <tspan
          style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)' }}
          dy="5.7500001525878925"
        >
          {tone}
        </tspan>
      </text>
      <text
        x="63"
        y="10"
        textAnchor="start"
        fontSize="15px"
        stroke="none"
        fill="#444444"
        style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)' }}
        className="chord-name-part"
      >
        <tspan
          style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)' }}
          dy="5.749999618530273"
        >
          {num}
        </tspan>
      </text>
    </>
  );
}

function Chord({
  chordName = 'C,,,',
  strings = 'X 3 2 0 1 0',
  fingering = 'X 3 2 X 1 X',
}) {
  const chord = strings.split(' ');
  const fingers = fingering.split(' ');
  const fret = 1;

  return (
    <svg
      height="162"
      version="1.1"
      width="147"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 147 162"
      style={{ overflow: 'hidden', position: 'relative' }}
    >
      <desc style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)' }}>
        {chordName}
      </desc>
      <defs style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)' }}></defs>
      <Grid />
      {chord.map((string, idx) =>
        ['O', 'X'].includes(string) ? (
          <StringAnnotation
            key={idx}
            position={chord.length - 1 - idx}
            type={string as AnnotationType}
          />
        ) : null
      )}
      <ChordNamePart chord={chordName} />
      <FingerPosition strings={chord} fingers={fingers} />
      <FretStartNumber fret={fret} />
    </svg>
  );
}

export default Chord;
