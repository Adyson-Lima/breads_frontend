import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Breads from '../pages/Breads';

describe('testes da tela Breads', () => {

  beforeEach(() => {
    render(
      <BrowserRouter>
        <Breads />
      </BrowserRouter>
    );
  });

  it('Existe card em Breads?', () => {
    expect(screen.getByTestId('mycard')).toBeInTheDocument();
  });

  it('Existe link Novo em Breads?', () => {
    expect(screen.getByTestId('mylink')).toBeInTheDocument();
  });

});