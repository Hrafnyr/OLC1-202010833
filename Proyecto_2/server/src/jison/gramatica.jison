
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
"+" {console.log("Token <tk_mas>:  "+yytext);    return "tkMas";   }
"-" {console.log("Token <tk_menos>:  "+yytext);  return "tkMenos"; }
"*" {console.log("Token <tk_mult>:  "+yytext);   return "tkMult";  }
"/" {console.log("Token <tk_div>:  "+yytext);     return "tkDiv";  }
"^" {console.log("Token <tk_pot>:  "+yytext);     return "tkPot";  }
"%" {console.log("Token <tk_mod>:  "+yytext);     return "tkMod";  }

// ------ Operadores relacionales
">"\b   {console.log("Token <tk_mayor>:  "+yytext);        return "tkMayor";       }
"<"\b   {console.log("Token <tk_menor>:  "+yytext);        return "tkMenor";       }
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
([a-zA-Z_])[a-zA-Z0-9_ñÑ]* {console.log("Token <tk_ID>:  "+yytext);  return "tkID"; }
"," {console.log("Token <tk_coma>:  "+yytext);  return "tkComa"; }
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
    | TIPODATOS
    | error tkPtComa {console.log("Error sintactico, no se esperaba: "+ yytext +" en linea " + yylineno );}
;

DECLARACION
    : TIPODATO LISTAID tkSgIgual EXPRESION
    | TIPODATO LISTAID
;

ASIGNACION
    : tkID tkSgIgual EXPRESION
;

LISTAID
    : LISTAID tkComa tkID
    | tkID
;

TIPODATOS
    : tkAbrLL
    | tkCerrLL
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
	| tkAbrP EXPRESION tkCerrP        
;
