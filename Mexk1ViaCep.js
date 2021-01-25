class Mexk1ViaCep{

  cepInput = undefined
  data = null

  fields = {
    logradouro:  undefined,
    complemento: undefined,
    bairro:      undefined,
    localidade:  undefined,
    uf:          undefined,
    ibge:        undefined,
    gia:         undefined,
    ddd:         undefined,
    siafi:       undefined,
  }

  onError = () => null
  onResponse = () => null

  /**
   *
   * @param { HTMLInputElement } cepInput
   */
  constructor( cepInput ){
    this.cepInput = cepInput
    let self = this
    cepInput.addEventListener( 'keyup', function( e ){
      self.search( this.value )
    } )
  }

  search = ( cep ) => {
    this.data = null
    let cepOnlyNumbers = cep.replace(/\D/g, '');

    if( cepOnlyNumbers.length !== 8 ) return this.onErrorCallback()

    this.callApi( cep )
  }

  responseHandler = ( data ) => {
    if( !data || data.erro ) return this.onErrorCallback( 'Cep inválido ou não encontrado' )

    this.updateFields( data )
    this.data = data
    this.onResponse( data )
  }

  callApi( cep ){
    let xmlHttp = new XMLHttpRequest()
    xmlHttp.open( "GET", `https://viacep.com.br/ws/${cep}/json`, true )
    xmlHttp.send( null )
    xmlHttp.onload = () => this.responseHandler( JSON.parse( xmlHttp.response ) )
  }

  onErrorCallback = ( message = false ) => {
    this.onError( this.cepInput, message )
  }

  updateFields = ( data ) => {
    for( let[ key, val ] of Object.entries( this.fields ) ){
      if( val && data[ key ] ) {
        this.fields[key].value      = data[ key ]
        this.fields[key].innexText  = data[ key ]
      }
    }
  }

  setLogradouroInput = ( el ) => {
    this.fields.logradouro = el
  }
  setComplementoInput = ( el ) => {
    this.fields.complemento = el
  }
  setBairroInput = ( el ) => {
    this.fields.bairro = el
  }
  setLocalidadeInput = ( el ) => {
    this.fields.localidade = el
  }
  setUfInput = ( el ) => {
    this.fields.uf = el
  }
  setIbgeInput = ( el ) => {
    this.fields.ibge = el
  }
  setIbgeInput = ( el ) => {
    this.fields.ibge = el
  }
  setGiaInput = ( el ) => {
    this.fields.gia = el
  }
  setDddInput = ( el ) => {
    this.fields.ddd = el
  }
  setSiafiInput = ( el ) => {
    this.fields.siafi = el
  }
}