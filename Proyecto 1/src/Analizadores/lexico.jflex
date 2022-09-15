package Analizadores;
import java_cup.runtime.*;
import java.util.LinkedList;

//directrices
%%

//Tabla de errores
%{
    public static LinkedList<claseErrores> TError = new LinkedList<claseErrores>();
%}


%public
%class Analizador_Lexico
%cupsym Simbolos
%cup
%char
%column
%full
%ignorecase
%line
%unicode
%ignorecase //case insensitive off
// java -jar jflex-full-1.7.0.jar lexico.jflex
//Expresiones regulares
D= [0-9] 
L= [a-zA-Z]

ID= _{L}({L}|{D})*_ //Nombre de variable
Cadena= "\""[^\"\n]*"\"" //Cadenas de texto
digitoEntero= ({D})+ //Digitos enteros positivos
digitoDecimal= ({D})+"."({D})+ //Digitos decimales

caracter= '{L}' //caracter
caracterAS= ['][$][{]({D})+[}][']

comentario1= ("//".*\r\n)|("//".*\n)|("//".*\r)
comentario2= \/\**[^\*\/]*\**\/

AbInt = [¿]
Ssum = [+]

%%

//Area Léxica

//otros
<YYINITIAL>{Cadena} {
                    System.out.println("Token:<Cadena> lexema:"+yytext());
                    return new Symbol(Simbolos.Cadena,yyline,yycolumn,yytext());
                    }

<YYINITIAL>{digitoEntero}   {
                            System.out.println("Token:<digitoEntero> lexema:"+yytext());
                            return new Symbol(Simbolos.digitoEntero,yyline,yycolumn,yytext());
                            }

<YYINITIAL>{digitoDecimal}  {
                            System.out.println("Token:<digitoDecimal> lexema:"+yytext());
                            return new Symbol(Simbolos.digitoDecimal,yyline,yycolumn,yytext());
                            }

<YYINITIAL>{caracter}   {
                        System.out.println("Token:<caracter> lexema:"+yytext());
                        return new Symbol(Simbolos.caracter,yyline,yycolumn,yytext());
                        }

<YYINITIAL>{caracterAS}   {
                        System.out.println("Token:<caracterAS> lexema:"+yytext());
                        return new Symbol(Simbolos.caracterAS,yyline,yycolumn,yytext());
                        }

//Tipos de datos
<YYINITIAL>"numero" {
                    System.out.println("Token Reservada:<Número> lexema:"+yytext());
                    return new Symbol(Simbolos.Rnumero,yyline,yycolumn,yytext());
                    }

<YYINITIAL>"cadena" {
                    System.out.println("Token Reservada:<Cadena> lexema:"+yytext());
                    return new Symbol(Simbolos.Rcadena,yyline,yycolumn,yytext());
                    }

<YYINITIAL>"boolean"    {
                        System.out.println("Token Reservada:<Boolean> lexema:"+yytext());
                        return new Symbol(Simbolos.Rboolean,yyline,yycolumn,yytext());
                        }

<YYINITIAL>"caracter"   {
                        System.out.println("Token Reservada:<Carácter> lexema:"+yytext());
                        return new Symbol(Simbolos.Rcaracter,yyline,yycolumn,yytext());
                        }

//datos booleanos
<YYINITIAL>"verdadero"   {
                        System.out.println("Token:<Verdadero> lexema:"+yytext());
                        return new Symbol(Simbolos.Rtrue,yyline,yycolumn,yytext());
                        }

<YYINITIAL>"falso"   {
                        System.out.println("Token:<falso> lexema:"+yytext());
                        return new Symbol(Simbolos.Rfalse,yyline,yycolumn,yytext());
                        }

//Operaciones básicas y simbolos

<YYINITIAL>{Ssum}  {
                System.out.println("Token:<suma> lexema:"+yytext());
                return new Symbol(Simbolos.mas,yyline,yycolumn,yytext());
                }

<YYINITIAL>"-"  {
                System.out.println("Token:<resta> lexema:"+yytext());
                return new Symbol(Simbolos.resta,yyline,yycolumn,yytext());
                }

<YYINITIAL>"*"  {
                System.out.println("Token:<multiplicación> lexema:"+yytext());
                return new Symbol(Simbolos.mult,yyline,yycolumn,yytext());
                }

<YYINITIAL>"/"  {
                System.out.println("Token:<División> lexema:"+yytext());
                return new Symbol(Simbolos.div,yyline,yycolumn,yytext());
                }

<YYINITIAL>"potencia"   {
                        System.out.println("Token Reservada:<potencia> lexema:"+yytext());
                        return new Symbol(Simbolos.Rpotencia,yyline,yycolumn,yytext());
                        }

<YYINITIAL>"modulo" {
                    System.out.println("Token Reservada:<modulo> lexema:"+yytext());
                    return new Symbol(Simbolos.Rmod,yyline,yycolumn,yytext());
                    }

<YYINITIAL> "(" {
                System.out.println("Token:<Parentesis_A> lexema:"+yytext());
                return new Symbol(Simbolos.abrir_par, yyline,yycolumn, yytext());
                }
       
<YYINITIAL> ")" {
                System.out.println("Token:<Parentesis_C> lexema:"+yytext());
                return new Symbol(Simbolos.cerrar_par, yyline,yycolumn, yytext());
                }

<YYINITIAL> "[" {
                System.out.println("Token:<Parentesis_A> lexema:"+yytext());
                return new Symbol(Simbolos.abrir_cor, yyline,yycolumn, yytext());
                }
       
<YYINITIAL> "]" {
                System.out.println("Token:<Parentesis_C> lexema:"+yytext());
                return new Symbol(Simbolos.cerrar_cor, yyline,yycolumn, yytext());
                }     

<YYINITIAL> {AbInt} {
                System.out.println("Token:<interr_A> lexema:"+yytext());
                return new Symbol(Simbolos.aitr, yyline,yycolumn, yytext());
                }
       
<YYINITIAL> "?" {
                System.out.println("Token:<interr_C> lexema:"+yytext());
                return new Symbol(Simbolos.citr, yyline,yycolumn, yytext());
                }   

<YYINITIAL> ";" {
                System.out.println("Token:<puntoComa> lexema:"+yytext());
                return new Symbol(Simbolos.puntoComa, yyline,yycolumn, yytext());
                }

<YYINITIAL> "," {
                System.out.println("Token:<Coma> lexema:"+yytext());
                return new Symbol(Simbolos.Coma, yyline,yycolumn, yytext());
                }    

//Operadores relacionales

<YYINITIAL> "mayor" {
                    System.out.println("Token:<mayor> lexema:"+yytext());
                    return new Symbol(Simbolos.mayor, yyline,yycolumn, yytext());
                    }
       
<YYINITIAL> "menor" {
                    System.out.println("Token:<menor> lexema:"+yytext());
                    return new Symbol(Simbolos.menor, yyline,yycolumn, yytext());
                    }   

<YYINITIAL> "mayor_o_igual" {
                            System.out.println("Token:<mayorIgual> lexema:"+yytext());
                            return new Symbol(Simbolos.mayorIgual, yyline,yycolumn, yytext());
                            }
       
<YYINITIAL> "menor_o_igual" {
                            System.out.println("Token:<menorIgual> lexema:"+yytext());
                            return new Symbol(Simbolos.menorIgual, yyline,yycolumn, yytext());
                            }   

<YYINITIAL> "es_igual"  {
                        System.out.println("Token:<igual> lexema:"+yytext());
                        return new Symbol(Simbolos.igual, yyline,yycolumn, yytext());
                        }
       
<YYINITIAL> "es_diferente"  {
                            System.out.println("Token:<diferente> lexema:"+yytext());
                            return new Symbol(Simbolos.diferente,yyline,yycolumn, yytext());
                            }   

//operadores lógicos
<YYINITIAL> "or"    {
                    System.out.println("Token:<or> lexema:"+yytext());
                    return new Symbol(Simbolos.or, yyline,yycolumn, yytext());
                    }   

<YYINITIAL> "and"   {
                    System.out.println("Token:<and> lexema:"+yytext());
                    return new Symbol(Simbolos.and, yyline,yycolumn, yytext());
                    }
       
<YYINITIAL> "not"   {
                    System.out.println("Token:<not> lexema:"+yytext());
                    return new Symbol(Simbolos.not, yyline,yycolumn, yytext());
                    }   

//Global
<YYINITIAL> "inicio"    {
                        System.out.println("Token Reservada:<inicio> lexema:"+yytext());
                        return new Symbol(Simbolos.inicio, yyline,yycolumn, yytext());
                        }
       
<YYINITIAL> "fin"   {
                    System.out.println("Token Reservada:<fin> lexema:"+yytext());
                    return new Symbol(Simbolos.fin, yyline,yycolumn, yytext());
                    }   

//Comentarios
<YYINITIAL>{comentario1}    {
                            }
       
<YYINITIAL>{comentario2}    {
                            }   

//Declaracion
<YYINITIAL>"ingresar"   {
                        System.out.println("Token Reservada:<ingresar> lexema:"+yytext());
                        return new Symbol(Simbolos.Ringresar,yyline,yycolumn, yytext());
                        }  

<YYINITIAL>{ID}     {
                    System.out.println("Token:<id> lexema:"+yytext());
                    return new Symbol(Simbolos.id, yyline,yycolumn, yytext());
                    }  

<YYINITIAL>"como"   {
                    System.out.println("Token reservada:<como> lexema:"+yytext());
                    return new Symbol(Simbolos.Rcomo, yyline,yycolumn, yytext());
                    }  

<YYINITIAL>"con_valor"  {
                        System.out.println("Token Reservada:<con_valor> lexema:"+yytext());
                        return new Symbol(Simbolos.RCon_valor,yyline,yycolumn, yytext());
                        }

//Asignación
<YYINITIAL> "->"    {
                    System.out.println("Token:<Simbolo_asignacion> lexema:"+yytext());
                    return new Symbol(Simbolos.asignacion, yyline,yycolumn, yytext());
                    }

//Condicion if
<YYINITIAL> "si"    {
                    System.out.println("Token:<condSi> lexema:"+yytext());
                    return new Symbol(Simbolos.condSi,yyline,yycolumn, yytext());
                    }

<YYINITIAL> "de_lo_contrario"   {
                                System.out.println("Token:<contrario> lexema:"+yytext());
                                return new Symbol(Simbolos.contrario,yyline,yycolumn, yytext());
                                }

<YYINITIAL> "fin_si"    {
                        System.out.println("Token:<finSi> lexema:"+yytext());
                        return new Symbol(Simbolos.finSi, yyline,yycolumn, yytext());
                        }

<YYINITIAL> "o_si"  {
                    System.out.println("Token:<OSi> lexema:"+yytext());
                    return new Symbol(Simbolos.OSi, yyline,yycolumn, yytext());
                    }

//Selección múltiple
<YYINITIAL> "segun" {
                    System.out.println("Token:<segun> lexema:"+yytext());
                    return new Symbol(Simbolos.segun, yyline,yycolumn, yytext());
                    }

<YYINITIAL> "hacer" {
                    System.out.println("Token:<hacer> lexema:"+yytext());
                    return new Symbol(Simbolos.hacer, yyline,yycolumn, yytext());
                    }

<YYINITIAL> "entonces"  {
                        System.out.println("Token:<entonces> lexema:"+yytext());
                        return new Symbol(Simbolos.entonces, yyline,yycolumn, yytext());
                        }

<YYINITIAL> "fin_segun" {
                        System.out.println("Token:<finSegun> lexema:"+yytext());
                        return new Symbol(Simbolos.finSegun, yyline,yycolumn, yytext());
                        }

//ciclo for
<YYINITIAL> "para"  {
                    System.out.println("Token:<para> lexema:"+yytext());
                    return new Symbol(Simbolos.para, yyline,yycolumn, yytext());
                    }

<YYINITIAL> "hasta" {
                    System.out.println("Token:<hasta> lexema:"+yytext());
                    return new Symbol(Simbolos.hasta, yyline,yycolumn, yytext());
                    }

<YYINITIAL> "con_incremental"   {
                                System.out.println("Token:<incremento> lexema:"+yytext());
                                return new Symbol(Simbolos.incremento, yyline,yycolumn, yytext());
                                }


<YYINITIAL> "fin_para"  {
                        System.out.println("Token:<finPara> lexema:"+yytext());
                        return new Symbol(Simbolos.finPara,yyline,yycolumn, yytext());
                        }

//while
<YYINITIAL> "mientras"  {
                        System.out.println("Token:<mientras> lexema:"+yytext());
                        return new Symbol(Simbolos.mientras, yyline,yycolumn, yytext());
                        }

<YYINITIAL> "fin_mientras"  {
                            System.out.println("Token:<fin_mientras> lexema:"+yytext());
                            return new Symbol(Simbolos.finMientras, yyline,yycolumn, yytext());
                            }

//do while
<YYINITIAL> "repetir"   {
                        System.out.println("Token:<repetir> lexema:"+yytext());
                        return new Symbol(Simbolos.repetir,yyline,yycolumn, yytext());
                        }

<YYINITIAL> "hasta_que" {
                        System.out.println("Token:<hasta_que> lexema:"+yytext());
                        return new Symbol(Simbolos.hastaQue, yyline,yycolumn, yytext());
                        }

//retorno
<YYINITIAL> "retornar"  {
                        System.out.println("Token:<retornar> lexema:"+yytext());
                        return new Symbol(Simbolos.retornar, yyline,yycolumn, yytext());
                        }

//metodo
<YYINITIAL> "metodo"    {
                        System.out.println("Token:<metodo> lexema:"+yytext());
                        return new Symbol(Simbolos.metodo, yyline,yycolumn, yytext());
                       }

<YYINITIAL> "fin_metodo"    {
                            System.out.println("Token:<Finmetodo> lexema:"+yytext());
                            return new Symbol(Simbolos.Finmetodo, yyline,yycolumn, yytext());
                            }

<YYINITIAL> "con_parametros"    {
                                System.out.println("Token:<con_parametros> lexema:"+yytext());
                                return new Symbol(Simbolos.con_parametros,yyline,yycolumn, yytext());
                                }

//funciones
<YYINITIAL> "funcion"   {
                        System.out.println("Token:<funcion> lexema:"+yytext());
                        return new Symbol(Simbolos.funcion, yyline,yycolumn, yytext());
                        }

<YYINITIAL> "fin_funcion"   {
                            System.out.println("Token:<Finfuncion> lexema:"+yytext());
                            return new Symbol(Simbolos.Finfuncion,yyline,yycolumn, yytext());
                            }

//Llamada
<YYINITIAL> "ejecutar"  {
                        System.out.println("Token:<ejecutar> lexema:"+yytext());
                        return new Symbol(Simbolos.ejecutar, yyline,yycolumn, yytext());
                        }

//impresion
<YYINITIAL> "imprimir"  {
                        System.out.println("Token:<imprimir> lexema:"+yytext());
                        return new Symbol(Simbolos.imprimir, yyline,yycolumn, yytext());
                        }

<YYINITIAL> "imprimir_nl"   {
                            System.out.println("Token:<imprimir_nl> lexema:"+yytext());
                            return new Symbol(Simbolos.imprimir_nl, yyline,yycolumn,yytext());
                            }

//Excepciones
[ \t\r\n\f] {  /*este es un comentario en java, omitirlos*/ }

//------> Errores Lexicos
.   { 
    System.out.println("-> Error Léxico:"+yytext());
    System.out.println("Linea: "+ yyline + "  Columna:  "+ yycolumn);
    claseErrores datos = new claseErrores(yytext(), "Error Léxico", "Simbolo no existe en el lenguaje",yyline, yycolumn);
    TError.add(datos);
    }




  