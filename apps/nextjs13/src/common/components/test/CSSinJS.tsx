/**
 * https://velog.io/@keumky1/Vanilla-Extract%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80
 */
import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';

const colorArr = ['skyblue', 'red', 'gray', 'mint', 'blue'];

const Button = styled.button<{ count: number }>`
  font-size: 17px;

  &:hover {
    background-color: ${({ count }) => {
      const s = Array(10000000).map(() => 1);
      return colorArr[count];
    }};
  }
`;

const ShareButton = styled.button<{ isLoading: boolean }>`
  color: ${({ isLoading }) => (isLoading ? 'gray' : 'black')};
`;

function usePrevious<T>(value: T) {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default function CSSinJS() {
  const [count, setCount] = useState(0);
  const [rules, setRules] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const s = usePrevious(count);
  console.log({ s, count });
  useEffect(() => {
    const result = [];
    for (const rule of document.styleSheets[0].cssRules) {
      result.push(rule.cssText);
    }

    setRules(result);
  }, [count, isLoading]);

  return (
    <div className='App'>
      <div
        style={{
          borderRadius: '20px',
          background: '#F1F1EF',
          color: '#C4554D',
        }}
      >
        {rules.map((rule, index) => (
          <pre key={index}>{rule}</pre>
        ))}
      </div>
      <p> 클릭할때마다 style계산을 다시 실행합니다. </p>
      <b className='read-the-docs'>
        styled-component가 cssom에 style을 추가합니다.
      </b>
      <Button onClick={() => setCount(count => count + 1)} count={count}>
        count: {count}
      </Button>
      <Button onClick={() => setCount(count => count + 1)} count={count}>
        count: {count}
      </Button>
      <Button onClick={() => setCount(count => count + 1)} count={count}>
        count: {count}
      </Button>
      <Button onClick={() => setCount(count => count + 1)} count={count}>
        count: {count}
      </Button>
      <Button onClick={() => setCount(count => count + 1)} count={count}>
        count: {count}
      </Button>
      <Button onClick={() => setCount(count => count + 1)} count={count}>
        count: {count}
      </Button>
      <Button onClick={() => setCount(count => count + 1)} count={count}>
        count: {count}
      </Button>
      <Button onClick={() => setCount(count => count + 1)} count={count}>
        count: {count}
      </Button>
      <Button onClick={() => setCount(count => count + 1)} count={count}>
        count: {count}
      </Button>
      <ShareButton onClick={() => setIsLoading(true)} isLoading={isLoading}>
        Share
      </ShareButton>
    </div>
  );
}
