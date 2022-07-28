import * as React from 'react';
import cn from 'classnames';

type GuitarString = typeof gStrings[number];

const gStrings = [
  {
    position: 0,
    stringLabel: 'E2',
  },
  {
    position: 1,
    stringLabel: 'B',
  },
  {
    position: 2,
    stringLabel: 'G',
  },
  {
    position: 3,
    stringLabel: 'D',
  },
  {
    position: 4,
    stringLabel: 'A',
  },
  {
    position: 5,
    stringLabel: 'E',
  },
] as const;

type AnnotationType = '0' | 'X';

const gridOrigin = {
  offsetX: 20,
  offsetY: 36,
  lengthString: 170,
  lengthFret: 136,
};

const fretGap = 30;
const stringGap = 10;

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

function ChordString({
  position,
  stringLabel,
}: {
  position: GuitarString['position'];
  stringLabel: GuitarString['stringLabel'];
}) {
  return (
    <text
      x={gridOrigin.lengthString + stringGap}
      y={guitarStrings[position].y - 1}
      textAnchor="middle"
      fontSize="12px"
      stroke="none"
      fill="#444444"
      style={{
        WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
      }}
      className="fret-start-number"
    >
      <tspan style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)' }} dy="5.5">
        {stringLabel}
      </tspan>
    </text>
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
    const gap = previous[idx - 1].x + fretGap;
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
      {guitarStrings.map((str, idx) => (
        <Fret key={idx} {...str} />
      ))}
      {gStrings.map((str) => (
        <ChordString
          key={str.stringLabel}
          position={str.position}
          stringLabel={str.stringLabel}
        />
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
  position: GuitarString['position'];
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
      {type === '0' && (
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

export function FretStartNumber({ fret }: { fret: number }) {
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
  const multipleOnes = fingers
    .map((finger, idx) => ({
      finger,
      idx,
    }))
    .filter(({ finger }) => finger === '1');
  const hasStrikeout = (multipleOnes?.length || 0) > 1;
  return (
    <>
      {strings.map((str, idx) => {
        if (['X', 'O'].includes(str) || str === '0') return null;

        const x = guitarFrets[parseInt(strings[idx])].x - 15;
        const y = guitarStrings[reverseIdx - idx].y;
        const finger = fingers[idx];
        const isFirstOne = hasStrikeout && idx === multipleOnes[0].idx;
        const strikePosition = (y - gridOrigin.offsetY) / 2;

        return (
          <React.Fragment key={idx}>
            {(!hasStrikeout || (hasStrikeout && finger !== '1')) && (
              <>
                <circle
                  cx={x}
                  cy={y}
                  r="8"
                  stroke="none"
                  className={cn('finger-position-shape', {
                    'fill-yellow-900': finger === '1',
                    'fill-yellow-800': finger === '2',
                    'fill-yellow-700': finger === '3',
                    'fill-yellow-600': finger === '4',
                  })}
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
              </>
            )}
            {hasStrikeout && isFirstOne && (
              <>
                <path
                  d={`M${x - 5},${gridOrigin.offsetY}A5,5,0,0,1,${x + 5},${
                    gridOrigin.offsetY
                  }L${x + 5},${y}A5,5,0,0,1,${x - 5},${y}L${x - 5},36`}
                  className="finger-position-shape fill-yellow-900"
                  style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)' }}
                ></path>
                <text
                  x={x}
                  y={gridOrigin.offsetY}
                  textAnchor="middle"
                  fontFamily='"Arial"'
                  fontSize="10px"
                  stroke="none"
                  fill="#ffffff"
                  style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)' }}
                  className="finger-position-label"
                >
                  <tspan
                    style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)' }}
                    dy={strikePosition}
                  >
                    1
                  </tspan>
                </text>
              </>
            )}
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
  type = 'default',
}) {
  const chord = strings.split(' ');
  const fingers = fingering.split(' ');
  const name = chordName.split(',').join('');
  // const fret = 1;

  return (
    <svg
      data-testid={`chord-${name}`}
      version="1.1"
      className={cn('h-[80px] w-[100px] md:h-[162px] md:w-[200px]', {
        'rounded-lg bg-stone-50 shadow-xl': type === 'info',
      })}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 190 162"
      style={{ overflow: 'hidden', position: 'relative' }}
    >
      <desc style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)' }}>
        {chordName}
      </desc>
      <defs style={{ WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)' }}></defs>
      <Grid />
      {chord.map((str, idx) =>
        ['0', 'X'].includes(str) ? (
          <StringAnnotation
            key={idx}
            position={(chord.length - 1 - idx) as GuitarString['position']}
            type={str as AnnotationType}
          />
        ) : null
      )}
      <ChordNamePart chord={chordName} />
      <FingerPosition strings={chord} fingers={fingers} />
      {/* <FretStartNumber fret={fret} /> */}
    </svg>
  );
}

export default Chord;
