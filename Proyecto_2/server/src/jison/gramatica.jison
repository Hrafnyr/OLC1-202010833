
%{
    //Área de declaraciones
    var flag = 0
%}

//Definición Léxica -> $$ equivalente a RESULT de cup
%lex

//Permite no hacer distincion entre mayusculas/minusculas
%options case-insensitive 
%%

//-------------------------- Área de tokens y ER ----------------------

//Comentarios
(\/\/)[^\n]*                        {console.log("Token <comentario 1>: "+yytext)}
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] {console.log("Token <comentario 2>: "+yytext)}

/* Espacios en blanco se omiten*/
[ \r\t]+            {}
\n                  {}

//-------------- Tipo de datos
"int"       {console.log("Token <pr_int>: "+yytext);     return "prInt";      }
"double"    {console.log("Token <pr_double>: "+yytext);  return "prDouble";   }
"boolean"   {console.log("Token <pr_boolean>: "+yytext); return "prBoolean";  }
"char"      {console.log("Token <pr_char>: "+yytext);    return "prChar";     }
"string"    {console.log("Token <pr_string>: "+yytext);  return "prString";   }

[0-9]+("."[0-9]+)\b    {console.log("Token <decimal>: "+yytext); return "tkDecimal";  }
[0-9]+\b               {console.log("Token <entero>: "+yytext);  return "tkEntero";   }

"true"  {console.log("Token <pr_true>: "+yytext);   return "prTrue";  }
"false" {console.log("Token <pr_false>: "+yytext);  return "prFalse"; }

[\'][^'][\']  {console.log("Token <tk_caracter>: "+yytext);  return "tkCaracter"; }
[\"][^"]*[\"] {console.log("Token <tk_cadena>:  "+yytext);  return "tkCadena"; }

// --------- Operadores aritméticos
"+"[^+] {console.log("Token <tk_mas>:  "+yytext);    return "tkMas";   }
"-"[^-] {console.log("Token <tk_menos>:  "+yytext);  return "tkMenos"; }
"*"     {console.log("Token <tk_mult>:  "+yytext);   return "tkMult";  }
"/"     {console.log("Token <tk_div>:  "+yytext);     return "tkDiv";  }
"^"     {console.log("Token <tk_pot>:  "+yytext);     return "tkPot";  }
"%"     {console.log("Token <tk_mod>:  "+yytext);     return "tkMod";  }
"++"    {console.log("Token <tk_incremento>:  "+yytext);  return "tkIncremento";   }
"--"    {console.log("Token <tk_decremento>:  "+yytext);  return "tkDecremento"; }

// ------ Operadores relacionales
">"[^=]   {console.log("Token <tk_mayor>:  "+yytext);        return "tkMayor";       }
"<"[^=]   {console.log("Token <tk_menor>:  "+yytext);        return "tkMenor";       }
">="    {console.log("Token <tk_mayorIgual>:  "+yytext);   return "tkMayorIgual";  }
"<="    {console.log("Token <tk_menorIgual>:  "+yytext);   return "tkMenorIgual";  }
"="[^=] {console.log("Token <tk_sgIgual>:  "+yytext);      return "tkSgIgual";}
"=="    {console.log("Token <tk_Igual>:  "+yytext);        return "tkIgual";       }
"!="    {console.log("Token <tk_diferente>:  "+yytext);    return "tkDiferente";   }

//------- Operadores lógicos
"||"   {console.log("Token <tk_or>:  "+yytext);   return "tkOr";  }
"&&"   {console.log("Token <tk_and>:  "+yytext);  return "tkAnd"; }
"!"    {console.log("Token <tk_not>:  "+yytext);  return "tkNot"; }

//-------- Signos de agrupación 
[(]    {console.log("Token <tk_abrP>:  "+yytext);   return "tkAbrP";  }
[)]    {console.log("Token <tk_cerrP>:  "+yytext);  return "tkCerrP"; }

//----- Finalización y encapsulamiento
";" {console.log("Token <tk_ptComa>:  "+yytext);  return "tkPtComa"; }
"{" {console.log("Token <tk_abrLL>:  "+yytext);   return "tkAbrLL";  }
"}" {console.log("Token <tk_cerrLL>:  "+yytext);  return "tkCerrLL"; }

//otros
"new"       {console.log("Token <pr_new>:  "+yytext);     return "prNew";       }
"print"     {console.log("Token <pr_print>:  "+yytext);   return "prPrint";     }
"println"   {console.log("Token <pr_printl>:  "+yytext);  return "prPrintln";   }
"if"        {console.log("Token <pr_if>:  "+yytext);      return "prIF";        }
"else"      {console.log("Token <pr_else>:  "+yytext);    return "prElse";      }
"elif"      {console.log("Token <pr_elif>:  "+yytext);    return "prElif";      }
"switch"    {console.log("Token <pr_switch>:  "+yytext);  return "prSwitch";    }
"case"      {console.log("Token <pr_case>:  "+yytext);    return "prCase";      }
"default"   {console.log("Token <pr_default>:  "+yytext); return "prDefault";   }
"break"     {console.log("Token <pr_break>:  "+yytext);   return "prBreak";     }
"continue"     {console.log("Token <pr_continue>:  "+yytext);   return "prContinue";     }
"while"     {console.log("Token <pr_while>:  "+yytext);   return "prWhile";     }
"for"       {console.log("Token <pr_for>:  "+yytext);     return "prFor";       }
"do"        {console.log("Token <pr_do>:  "+yytext);      return "prDo";        }
"until"     {console.log("Token <pr_until>:  "+yytext);   return "prUntil";     }
"return"    {console.log("Token <pr_return>:  "+yytext);   return "prReturn";   }
"tolower"     {console.log("Token <pr_lower>:  "+yytext);   return "prLower";     }
"toupper"    {console.log("Token <pr_Upper>:  "+yytext);   return "prUpper";   }
"round"    {console.log("Token <pr_Round>:  "+yytext);   return "prRound";   }
"void"      {console.log("Token <pr_void>:  "+yytext);   return "prVoid";  }
"run"      {console.log("Token <pr_Run>:  "+yytext);   return "prRun";  }
"length"     {console.log("Token <pr_length>:  "+yytext);   return "prLength";     }
"typeof"    {console.log("Token <pr_typeof>:  "+yytext);   return "prTypeof";   }
".push"     {console.log("Token <pr_push>:  "+yytext);   return "prPush";     }
".pop"    {console.log("Token <pr_pop>:  "+yytext);   return "prPop";   }
"toString"    {console.log("Token <pr_toString>:  "+yytext);   return "prToString";   }
"toCharArray"      {console.log("Token <pr_toCharArray>:  "+yytext);   return "prToCharArray";  }
([a-zA-Z_])[a-zA-Z0-9_ñÑ]* {console.log("Token <tk_ID>:  "+yytext);  return "tkID"; }
"," {console.log("Token <tk_coma>:  "+yytext);  return "tkComa"; }
":" {console.log("Token <tk_2puntos>:  "+yytext);  return "tk2Puntos"; }
"?" {console.log("Token <tk_ternario>:  "+yytext);  return "tkTernario"; }
[[] {console.log("Token <tk_abrC>: "+yytext);  return "tkAbrC"; }
"]" {console.log("Token <tk_cerrC>: "+yytext);  return "tkCerrC"; }
<<EOF>> {console.log("Fin de documento"); return 'EOF';}

//Errores lexicos
.   { console.error('Error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);}

/lex

//Precedencia de operadores
%left tkOr
%left tkAnd
%right tkNot
%left tkIgual tkDiferente tkMayorIgual tkMenorIgual tkMenor tkMayor
%left tkMas tkMenos
%left tkMult tkDiv tkMod
%left tkPot
%left UMENUS

%start INICIAR

%%

//gramaticas
INICIAR
    : CUERPO EOF
;

CUERPO
    : CUERPO INS
    | INS
;

INS
    : DECLARACION tkPtComa
    | ASIGNACION tkPtComa
    | INCREMENTO tkPtComa
    | VECTORES tkPtComa
    | MODIFICARVEC tkPtComa
    | PRINTS tkPtComa
    | prBreak tkPtComa
    | prContinue tkPtComa
    | RETURN tkPtComa
    | CONDICIONALES
    | CICLOS
    | FUNCIONES
    | METODOS
    | LLAMADAS tkPtComa
    | RUN
    | OPVEC tkPtComa
    | error tkPtComa {console.log("Error sintactico, no se esperaba: "+ yytext +" en linea " + yylineno );}
;

METODOS
    : tkID tkAbrP PARAMETROSF tkCerrP tk2Puntos prVoid tkAbrLL CUERPO tkCerrLL
    | tkID tkAbrP PARAMETROSF tkCerrP tkAbrLL CUERPO tkCerrLL
    | tkID tkAbrP tkCerrP tk2Puntos prVoid tkAbrLL CUERPO tkCerrLL
    | tkID tkAbrP tkCerrP tkAbrLL CUERPO tkCerrLL
;

FUNCIONES
    : tkID tkAbrP PARAMETROSF tkCerrP tk2Puntos TIPODATO tkAbrLL CUERPO tkCerrLL
    | tkID tkAbrP tkCerrP tk2Puntos TIPODATO tkAbrLL CUERPO tkCerrLL
;

RUN
    : prRun LLAMADAS tkPtComa
;

LLAMADAS
    : tkID tkAbrP LISTAVEC1 tkCerrP
    | tkID tkAbrP tkCerrP
;

FUNCS
    : prLower tkAbrP EXPRESION tkCerrP 
    | prUpper tkAbrP EXPRESION tkCerrP 
    | prRound tkAbrP EXPRESION tkCerrP
    | prLength tkAbrP EXPRESION tkCerrP
    | prTypeof tkAbrP EXPRESION tkCerrP
    | prToString tkAbrP EXPRESION tkCerrP
;

PRINTS
    : prPrint tkAbrP EXPRESION tkCerrP
    | prPrintln tkAbrP EXPRESION tkCerrP
;

PARAMETROSF
    : PARAMETROSF tkComa TIPODATO tkID
    | TIPODATO tkID
;

RETURN
    : prReturn EXPRESION
;

DECLARACION
    : TIPODATO LISTAID tkSgIgual EXPRESION
    | TIPODATO LISTAID tkSgIgual CASTEO EXPRESION
    | TIPODATO LISTAID
;

//Vectores
VECTORES
    : TIPODATO tkAbrC tkCerrC TIPOV1
    | TIPODATO tkAbrC tkCerrC tkAbrC tkCerrC TIPOV2
;

TIPOV1
    : tkID tkSgIgual prNew TIPODATO tkAbrC EXPRESION tkCerrC
    | tkID tkSgIgual prToCharArray tkAbrP EXPRESION tkCerrP
    | tkID tkSgIgual prNew TIPODATO tkAbrC CASTEO EXPRESION tkCerrC
    | tkID tkSgIgual tkAbrLL LISTAVEC1 tkCerrLL
;

TIPOV2
    : tkID tkSgIgual prNew TIPODATO tkAbrC EXPRESION tkCerrC tkAbrC EXPRESION tkCerrC
    | tkID tkSgIgual tkAbrLL tkAbrLL LISTAVEC1 tkCerrLL tkComa  tkAbrLL LISTAVEC1 tkCerrLL tkCerrLL
;
    
LISTAVEC1
    : LISTAVEC1 tkComa EXPRESION
    | EXPRESION
;

MODIFICARVEC
    : tkID tkAbrC EXPRESION tkCerrC tkSgIgual EXPRESION
    | tkID tkAbrC EXPRESION tkCerrC tkAbrC EXPRESION tkCerrC tkSgIgual EXPRESION
;

OPVEC
    : tkID prPush tkAbrP EXPRESION tkCerrP
    | tkID prPop tkAbrP tkCerrP
;

CONDICIONALES
    : IF
    | SWITCH
;

IF
    : prIF tkAbrP EXPRESION tkCerrP BLOQUEIF
;

BLOQUEIF
    : tkAbrLL CUERPO tkCerrLL
    | tkAbrLL CUERPO tkCerrLL ELIFB
    | tkAbrLL CUERPO tkCerrLL ELSEB
;

ELIFB
    : prElif tkAbrP EXPRESION tkCerrP BLOQUEIF  
;

ELSEB
    : prElse BLOQUEIF  
;

SWITCH
    : prSwitch tkAbrP EXPRESION tkCerrP BLOQUESW
;

BLOQUESW
    : tkAbrLL CASE DEFAULT tkCerrLL
    | tkAbrLL CASE tkCerrLL
    | tkAbrLL DEFAULT tkCerrLL
;

CASE
    : CASE prCase EXPRESION tk2Puntos CUERPO
    | prCase EXPRESION tk2Puntos CUERPO
;

DEFAULT
    : prDefault tk2Puntos CUERPO
;

CICLOS
    : WHILE
    | FOR
    | DOWHILE
    | DOUNTIL
;

WHILE
    : prWhile tkAbrP EXPRESION tkCerrP tkAbrLL CUERPO tkCerrLL
;

FOR 
    : prFor tkAbrP DECLARACION tkPtComa EXPRESION tkPtComa INCREMENTO tkCerrP tkAbrLL CUERPO tkCerrLL
    | prFor tkAbrP DECLARACION tkPtComa EXPRESION tkPtComa ASIGNACION tkCerrP tkAbrLL CUERPO tkCerrLL
    | prFor tkAbrP ASIGNACION tkPtComa EXPRESION tkPtComa INCREMENTO tkCerrP tkAbrLL CUERPO tkCerrLL
    | prFor tkAbrP ASIGNACION tkPtComa EXPRESION tkPtComa ASIGNACION tkCerrP tkAbrLL CUERPO tkCerrLL
;

DOWHILE
    : prDo tkAbrLL CUERPO tkCerrLL prWhile tkAbrP EXPRESION tkCerrP tkPtComa
;

DOUNTIL
    : prDo tkAbrLL CUERPO tkCerrLL prUntil tkAbrP EXPRESION tkCerrP tkPtComa
;

CASTEO
    : tkAbrP TIPODATO tkCerrP
;

INCREMENTO
    : tkID tkIncremento
    | tkID tkDecremento
;   

ASIGNACION
    : tkID tkSgIgual EXPRESION
    | tkID tkSgIgual EXPRESION tkTernario EXPRESION tk2Puntos EXPRESION
;

LISTAID
    : LISTAID tkComa tkID
    | tkID
;

TIPODATO
    : prInt
    | prDouble
    | prString
    | prChar
    | prBoolean
;

EXPRESION
	: tkMenos EXPRESION %prec UMENOS  
	| tkID tkDecremento
    | tkID tkIncremento

    | EXPRESION tkMas   EXPRESION     
	| EXPRESION tkMenos EXPRESION     
	| EXPRESION tkMult EXPRESION      
	| EXPRESION tkDiv EXPRESION       
    | EXPRESION tkMod EXPRESION      
    | EXPRESION tkPot EXPRESION   
    | EXPRESION tkMenor  EXPRESION     
    | EXPRESION tkMayor  EXPRESION 
    | EXPRESION tkMayorIgual EXPRESION  
    | EXPRESION tkMenorIgual EXPRESION  
    | EXPRESION tkIgual EXPRESION         
    | EXPRESION tkDiferente EXPRESION 

    | EXPRESION tkAnd EXPRESION 
    | EXPRESION tkOr EXPRESION
    | tkNot EXPRESION       
    | tkEntero                      
    | tkDecimal
    | tkID
    | prTrue
    | prFalse
    | tkCadena
    | tkCaracter
    | LLAMADAS
    | FUNCS
    | ACCEDERVECTOR                                 
	| tkAbrP EXPRESION tkCerrP        
;

ACCEDERVECTOR
    : tkID tkAbrC EXPRESION tkCerrC
    | tkID tkAbrC EXPRESION tkCerrC tkAbrC EXPRESION tkCerrC
;
