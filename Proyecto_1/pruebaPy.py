def main():
    _variable1_ = 5
    _v1_,_v2_,_v3_ = "esta es una cadena","esta es una cadena","esta es una cadena"
    _curso1_ = "olc"
    _curso2_ = "olc"
    _curso3_ = "olc"
    _pi1_ = 3
    _pi2_ = 3.1
    _pi3_ = 3.14
    _pi4_ = 3.141
    _anio1_ = 1
    _anio2_ = 9
    _anio3_ = 4
    _anio4_ = 5
    _variableNeg_ = 5.0
    _encabezado1_ = "Universidad San Carlos de Guatemala...;"
    _encabezado2_ = "Escuela de Ciencias y Sistemas Segundo semestre"
    _flag1_ = True
    _flag2_ = False
    _name1_ = 'f'
    _name2_ = 'e'
    _name3_ = 'r'
    _name4_,_name6_ = 'n','n'
    _name5_ = 'a'
    _name7_ = 'd'
    _name8_ = 'o'
    _operacionRela3_ = _operaciones1Basica_>8
    _v1_ = "esta es la cadena numero 1"
    _v2_,_v3_ = "estas cadenas deben ser diferentes","estas cadenas deben ser diferentes"
    _curso1_,_curso2_,_curso3_ = "Organizacion de lenguajes y compiladores 1","Organizacion de lenguajes y compiladores 1","Organizacion de lenguajes y compiladores 1"
    print(_encabezado1_,"\n")
    print(_encabezado2_,"\n")
    print("...")
    print(_anio1_)
    print(_anio2_)
    print(_anio3_)
    print(_anio4_)
    print(".","\n")
    if _v1_==_v2_:
        print("Al parecer no funciona la asignacion","\n")
        while _variable1_>=5:
            print(_variable1_)
            _variable1_ = _variable1_
    if _v1_==_v2_:
        print("no tiene que imprimir este mensaje","\n")
    else:
        print("este print es un ejemplo")
    if _v1_==_v2_:
        print("no tiene que imprimir este mensaje","\n")
    elif _v1_==13:
        print("mensaje de prueba","\n")
    elif _v1_==14:
        print("mensaje de prueba","\n")
    else:
        print("este print es un ejemplo","\n")
    _varB_ = False
    if _varB_:
        print("Estas definiendo bien los valores","\n")
        _varaux_ = 2
        if _varaux_==0:
            print("el valor es mayor a 0 y menos a 2","\n")
        elif _varaux_==2:
            print("el valor es mayor a 2","\n")
    def _potenciaManual_(_base_,_exponenete_):
        _i_ = 0
        _acumulado_ = 0
        for _i_ in range(0,_exponente_):
            _acumulado_ = _acumulado_
        print(_acumulado_)
        print(" Esta es la potencia Manual","\n")
    def _potenciaFuncion_(_base_,_exponente_):
        _potencia_ = 5.5
        return _potencia_
    def _metodo1_():
        print("estamos entrando al metodo 1","\n")
        print(" Esta es la potencia Funcion","\n")
    _metodo1_()
if __name__ == '__main__':
    main()