Feature: validate api for single user

  Scenario: criar uma conta
    Given que envio uma requisicao de login
    When envio uma requisicao para abertura de uma conta
    Then eu reseto as configuracoes
    And altero dados de uma conta "Conta para alterar"

  Scenario Outline: Tentar criar uma conta existente
    Given que envio uma requisicao de login
    When envio uma requisicao para abertura de uma conta "<nome conta>"

    Examples:
      |nome conta|
      |Conta mesmo nome|
      |Conta para movimentacoes|