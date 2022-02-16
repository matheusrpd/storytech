pragma solidity ^0.7.0;

contract Owned {
  address payable owner;

  constructor() public {
      owner = msg.sender;
  }

  modifier onlyOwner {
      require(msg.sender == owner, "Somente o dono do contrato pode executar essa funcao.");
      _;
  }
}

contract Storytech is Owned {

  event eventSignature(address _address);
  event eventSubscriptionExpiring(address _address);

  mapping (address => uint) private subscribers;

  // Função que realiza assinatura
  function signature() external notIsSubscriber payable {
      require(msg.value == 0.1 ether, "Valor de assinatura incorreto.");

      uint endDateOfSignarture = block.timestamp + 30 * 1 days;

      subscribers[msg.sender] = endDateOfSignarture;

      emit eventSignature(msg.sender);
  }

  // Função que retorna se ainda assinante ainda é válido
  function getSignatureValid() public returns (bool) {
      uint qtdDays = calculateDaysEndOfSignature();

      return qtdDays > 0;
  }

  // Função que calcula quantidade de dias restantes para terminar assinatura
  function calculateDaysEndOfSignature() public isSubscriber returns (uint) {
      uint qtdDays = (subscribers[msg.sender] - block.timestamp) / 60 / 60 / 24;

      if (qtdDays <= 29) {
          emit eventSubscriptionExpiring(msg.sender);
      }

      return qtdDays;
  }

  // Função que exclui assinatura de algum endereço
  function deleteSubscriber(address _address) public onlyOwner {
      delete subscribers[_address]; 
  }

  // Verifica se carteira é assinante
  modifier isSubscriber {
      require(subscribers[msg.sender] != 0, "Nao possui assinatura.");
      _;
  }

  // Verifica se carteira é assinante
  modifier notIsSubscriber {
      require(subscribers[msg.sender] == 0, "Ja possui assinatura.");
      _;
  }
}