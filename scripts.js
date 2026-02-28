document.addEventListener('DOMContentLoaded', function () {

  const ordemResultado = document.querySelector(".resultado-ordem");
  const btnNovamente = document.querySelector(".btn-novamente");
  const btnVoltar = document.querySelector(".btn-voltar");
  const formContent = document.querySelector(".form-content");
  const form = document.querySelector('.contentform');
  const resultadoSection = document.querySelector('.resultado-section');
  const numerosContainer = document.querySelector('.numeros-sorteados');

  let ultimaQuantidade;
  let ultimoMin;
  let ultimoMax;
  let ultimoRepetir;
  let contadorSorteios = 0;

  function sortearNumeros(quantidade, min, max, repetir) {
  const numeros = [];

  while (numeros.length < quantidade) {
    const numeroSorteado =
      Math.floor(Math.random() * (max - min + 1)) + min;

    if (repetir) {
      numeros.push(numeroSorteado);
    } else {
      if (!numeros.includes(numeroSorteado)) {
        numeros.push(numeroSorteado);
      }
    }
  }

  return numeros;
  }

 function mostrarNumeros(numeros) {
  numerosContainer.innerHTML = "";

  numeros.forEach((numero, index) => {
    const span = document.createElement("span");
    span.textContent = numero;
    span.classList.add("numero");
    numerosContainer.appendChild(span);

    // animação com delay
    setTimeout(() => {
      span.classList.add("aparecer");
    }, index * 200);
  });

  resultadoSection.scrollIntoView({ behavior: "smooth" });
}


form.addEventListener('submit', function (e) {
  e.preventDefault();

  const mensagemErro = document.getElementById("mensagemErro");
  mensagemErro.textContent = "";
  mensagemErro.style.display = "none";


  const quantidadeInput = document.getElementById('quantidade');
  const deInput = document.getElementById('de');
  const ateInput = document.getElementById('ate');

  const quantidade = quantidadeInput.value.trim();
  const de = deInput.value.trim();
  const ate = ateInput.value.trim();

  // 🔹 Converter para número PRIMEIRO
  const quantidadeNum = Number(quantidade);
  const deNum = Number(de);
  const ateNum = Number(ate);

  const noRepeat = document.getElementById('noRepeat').checked;
  const intervalo = ateNum - deNum + 1;

    console.log({
  quantidadeNum,
  deNum,
  ateNum,
  noRepeat
});

  // 🔹 1 - validar intervalo
  if (ateNum <= deNum) {
    mensagemErro.textContent = "O valor 'ATÉ' deve ser maior que 'DE'.";
    mensagemErro.style.display = "flex";
    return;
  }

  // 🔹 2 - validar quantidade no modo não repetir
  if (noRepeat && quantidadeNum > intervalo) {
    mensagemErro.textContent = "A quantidade não pode ser maior que o intervalo quando 'Não repetir' estiver marcado.";
    mensagemErro.style.display = "flex";
    return;
  }

formContent.classList.add("oculto");
resultadoSection.classList.add("ativo");

  resultadoSection.setAttribute("tabindex", "-1");
  resultadoSection.focus();

  const numerosSorteados = sortearNumeros(
  quantidadeNum,
  deNum,
  ateNum,
  !noRepeat // se noRepeat está marcado, repetir = false
  );
  
  // salvar parâmetros
  ultimaQuantidade = quantidadeNum;
  ultimoMin = deNum;
  ultimoMax = ateNum;
  ultimoRepetir = !noRepeat;

  contadorSorteios = 1;
  ordemResultado.textContent = `${contadorSorteios}º RESULTADO`;

  mostrarNumeros(numerosSorteados);
});

btnNovamente.addEventListener("click", function () {

  const novosNumeros = sortearNumeros(
    ultimaQuantidade,
    ultimoMin,
    ultimoMax,
    ultimoRepetir
  );

  contadorSorteios++;
  ordemResultado.textContent = `${contadorSorteios}º RESULTADO`;

  mostrarNumeros(novosNumeros);
});

btnVoltar.addEventListener("click", function () {
  resultadoSection.classList.remove("ativo");
  formContent.classList.remove("oculto");

  numerosContainer.innerHTML = "";
  contadorSorteios = 0;
});

});


