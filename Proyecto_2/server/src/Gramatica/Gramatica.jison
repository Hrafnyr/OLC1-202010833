
%{
    //tabla de símbolos -> Variables, funciones y métodos
    var tablaSimbolos = []; //->datos [[nombre,tipo,fila,columna]]
    var tablaErrores = []; //->datos [[Tipo,descripcion,fila,columna]]
    
    

    module.exports.tablaErrores = tablaErrores;
    module.exports.tablaSimbolos = tablaSimbolos;
    module.exports.clear1 = function clearSimbolos(){
        
        while (tablaSimbolos.length > 0){
            tablaSimbolos.pop()
        }
        console.log("Debería estar vacío:",tablaSimbolos)
    };
    module.exports.clear2 = function clearErrores(){
        
        while (tablaErrores.length > 0){
            tablaErrores.pop()
        }
        console.log("Debería estar vacío:",tablaErrores)
    };

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
"++"    {console.log("Token <tk_incremento>:  "+yytext);  return "tkIncremento";   }
"--"    {console.log("Token <tk_decremento>:  "+yytext);  return "tkDecremento"; }
"+" {console.log("Token <tk_mas>:  "+yytext);    return "tkMas";   }
"-" {console.log("Token <tk_menos>:  "+yytext);  return "tkMenos"; }
"*"     {console.log("Token <tk_mult>:  "+yytext);   return "tkMult";  }
"/"     {console.log("Token <tk_div>:  "+yytext);     return "tkDiv";  }
"^"     {console.log("Token <tk_pot>:  "+yytext);     return "tkPot";  }
"%"     {console.log("Token <tk_mod>:  "+yytext);     return "tkMod";  }


// ------ Operadores relacionales
">="    {console.log("Token <tk_mayorIgual>:  "+yytext);   return "tkMayorIgual";  }
"<="    {console.log("Token <tk_menorIgual>:  "+yytext);   return "tkMenorIgual";  }
"=="    {console.log("Token <tk_Igual>:  "+yytext);        return "tkIgual";       }
"!="    {console.log("Token <tk_diferente>:  "+yytext);    return "tkDiferente";   }
">"   {console.log("Token <tk_mayor>:  "+yytext);        return "tkMayor";       }
"<"   {console.log("Token <tk_menor>:  "+yytext);        return "tkMenor";       }
"=" {console.log("Token <tk_sgIgual>:  "+yytext);      return "tkSgIgual";}


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
"continue"  {console.log("Token <pr_continue>:  "+yytext);   return "prContinue";     }
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
.   { 
        console.error('Error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);
        tablaErrores.push(["Error léxico","No se reconoce: "+yytext,yylloc.first_line,yylloc.first_column]); 
    }

/lex

//Precedencia de operadores
%left tkOr
%left tkAnd
%left tkIgual tkDiferente tkMayorIgual tkMenorIgual tkMenor tkMayor
%left tkMas tkMenos
%left tkMult tkDiv tkMod
%left tkPot
%left UMENUS

%right tkNot

%start INICIAR

%%

//gramaticas
INICIAR
    : CUERPO EOF 
        {   
            // console.log($1)
            // tree.Raiz.verNodo();
            // tree.verHijosRecursivo(root);
            // tree.Graficar();

            // //Reiniciar valores
            // tree = new AST();
            // root = tree.insertarRaiz(padre);
            // cont1 = 0;
            return $1;
        }
    | error tkPtComa 
        {
            console.log("Error sintactico, no se esperaba: "+ yytext +" en linea " + @1.first_line +", columna "+@1.first_column );
            tablaErrores.push(["Error sintáctico","No se esperaba: "+yytext, @1.first_line,@1.first_column]);
        }
;

CUERPO
    : CUERPO INS { $1.push($2); $$ = $1; }
    | INS        { $$ = [$1];}
;

INS
    : DECLARACION tkPtComa  {  $$ = $1;  }
    | ASIGNACION tkPtComa   {  $$ = $1;  }
    | INCREMENTO tkPtComa   {  $$ = $1;  }
    | VECTORES tkPtComa     {  $$ = $1;  }
    | MODIFICARVEC tkPtComa {  $$ = $1;  }
    | PRINTS tkPtComa       {  $$ = $1;  }
    | prBreak tkPtComa      {  $$ = ["BREAK"];  }
    | prContinue tkPtComa   {  $$ = ["CONTINUE"];  }
    | RETURN tkPtComa       {  $$ = $1;  }
    | CONDICIONALES         {  $$ = $1;  }
    | CICLOS                {  $$ = $1;  }
    | FUNCIONES             {  $$ = $1;  }
    | METODOS               {  $$ = $1;  }
    | LLAMADAS tkPtComa     {  $$ = $1;  }
    | RUN                   {  $$ = $1;  }
    | OPVEC tkPtComa        {  $$ = $1;  }
//    | error tkPtComa {console.log("Error sintactico, no se esperaba: "+ yytext +" en linea " + yylineno );}
;

METODOS
    : tkID tkAbrP PARAMETROSF tkCerrP tk2Puntos prVoid tkAbrLL CUERPO tkCerrLL 
    { 
        tablaSimbolos.push([$1,"Metodo",$6,@1.first_line,@1.first_column]); 
        $$= ["METODO",$1,"PARAMETROS",$3,"VOID",$8];
    }
    | tkID tkAbrP PARAMETROSF tkCerrP tkAbrLL CUERPO tkCerrLL 
    { 
         tablaSimbolos.push([$1,"Metodo","-",@1.first_line,@1.first_column]); 
        $$= ["METODO",$1,"PARAMETROS",$3,$6];
    }
    | tkID tkAbrP tkCerrP tk2Puntos prVoid tkAbrLL CUERPO tkCerrLL 
    { 
        tablaSimbolos.push($1,"Metodo",$5,@1.first_line,@1.first_column); 
        $$= ["METODO",$1,"VOID",$7];
    }
    | tkID tkAbrP tkCerrP tkAbrLL CUERPO tkCerrLL 
    { 
        tablaSimbolos.push([$1,"Metodo","-",@1.first_line,@1.first_column]); 
        $$= ["METODO",$1,$5];
    }
;

FUNCIONES
    : tkID tkAbrP PARAMETROSF tkCerrP tk2Puntos TIPODATO tkAbrLL CUERPO tkCerrLL
    {
        tablaSimbolos.push([$1,"Funcion",$6,@1.first_line,@1.first_column]); 
        $$=["FUNCION",$1,"PARAMETROS",$3,$6,$8];
    }
    | tkID tkAbrP tkCerrP tk2Puntos TIPODATO tkAbrLL CUERPO tkCerrLL
    {
        tablaSimbolos.push([$1,"Funcion",$5,@1.first_line,@1.first_column]); 
        $$=["FUNCION",$1,$5,$7];
    }
;

RUN
    : 
    prRun LLAMADAS tkPtComa 
    {
        $$ = ["Run",$2];
    }
;

LLAMADAS
    : tkID tkAbrP LISTAVEC1 tkCerrP 
    {
        var aux = ["LLAMADAS",$1];
        for (let i = 0; i < $3.length; i++){
            aux.push($3[i]);
        }
        $$ = aux;
    }
    | tkID tkAbrP tkCerrP {$$ = ["LLAMADAS",$1]}
;

FUNCS
    : prLower tkAbrP EXPRESION tkCerrP {$$ = ["toLower",$3]}
    | prUpper tkAbrP EXPRESION tkCerrP {$$ = ["toUpper",$3]}
    | prRound tkAbrP EXPRESION tkCerrP {$$ = ["round",$3]}
    | prLength tkAbrP EXPRESION tkCerrP {$$ = ["lenght",$3]}
    | prTypeof tkAbrP EXPRESION tkCerrP {$$ = ["TypeOf",$3]}
    | prToString tkAbrP EXPRESION tkCerrP {$$ = ["toString",$3]}
;

PRINTS
    : prPrint tkAbrP EXPRESION tkCerrP
    {
        // tree.InsertarRecursivo(root,cont1+"-Print",padre);
        // tree.InsertarRecursivo(root,$3.replace("\""," "),cont1+"-Print");
        // cont1++;
        var aux = ["Print"];
        if(typeof $3 === "object"){
            for (let i = 0; i < $3.length; i++){
                aux.push($3[i]);
            }
        }else{
            aux.push($3);
        }
        $$ = aux;
    }
    | prPrintln tkAbrP EXPRESION tkCerrP
    {
        // tree.InsertarRecursivo(root,cont1+"-Println",padre);
        // tree.InsertarRecursivo(root,$3.replace("\""," "),cont1+"-Println");
        // cont1++;
        $$ = ["Println",$3];
    }
;

PARAMETROSF
    : PARAMETROSF tkComa TIPODATO tkID {$1.push($3,$4);$$=$1}
    | TIPODATO tkID {$$ = [$1,$2]}
;

RETURN
    : prReturn EXPRESION
    {
        var aux = ["Return"];
        if(typeof $2 === "object"){
            for (let i = 0; i < $2.length; i++){
                aux.push($2[i]);
            }
        }else{
            aux.push($2);
        }
        $$ = aux;
    }
;

DECLARACION
    : TIPODATO LISTAID tkSgIgual EXPRESION 
    {   
        var aux = ["DECLARACION"];
        aux.push($1);
        for (let i = 0; i < $2.length; i++){
            aux.push($2[i])
            tablaSimbolos.push([$2[i],"Variable",$1,@1.first_line,@1.first_column]);
        }

        aux.push("=")
        if(typeof $4 === "object"){
            for (let i = 0; i < $4.length; i++){
                aux.push($4[i]);
            }
        }else{
            aux.push($4);
        }
        $$ = aux;
    }
    | TIPODATO LISTAID tkSgIgual CASTEO EXPRESION
    {
        var aux = ["DECLARACION"];
        aux.push($1);
        for (let i = 0; i < $2.length; i++){
            aux.push($2[i]);
            tablaSimbolos.push([$2[i],"Variable",$1,@1.first_line,@1.first_column]);
        }
        aux.push($3);
        aux.push("CASTEO");
        aux.push($4);
        
        if(typeof $5 === "object"){
            for (let i = 0; i < $5.length; i++){
                aux.push($5[i]);
            }
        }else{
            aux.push($5);
        }
        $$ = aux;
    }
    | TIPODATO LISTAID
    {
        var aux = ["DECLARACION"];
         aux.push($1);
        for (let i = 0; i < $2.length; i++){
            aux.push($2[i]);
            tablaSimbolos.push([$2[i],"Variable",$1,@1.first_line,@1.first_column]);
        }
        $$ = aux;
    }
;

//Vectores
VECTORES
    : TIPODATO tkAbrC tkCerrC TIPOV1 
    {
        var aux = ["Vector"];
        aux.push($1);
        for (let i = 0; i < $4.length; i++){
            aux.push($4[i]);
        }
        $$ = aux;

    }
    | TIPODATO tkAbrC tkCerrC tkAbrC tkCerrC TIPOV2
    {
        var aux = ["Vector"];
        aux.push($1);
        for (let i = 0; i < $6.length; i++){
            aux.push($6[i]);
        }
        $$ = aux;
    }
;

TIPOV1
    : tkID tkSgIgual prNew TIPODATO tkAbrC EXPRESION tkCerrC 
    {
        tablaSimbolos.push([$1,"Vector",$4,@1.first_line,@1.first_line]);
        $$ = [$1,"Tamaño1",$6];
    }
    | tkID tkSgIgual prToCharArray tkAbrP EXPRESION tkCerrP 
    {
        tablaSimbolos.push([$1,"Vector","CharArray",@1.first_line,@1.first_line]);
        $$ = [$1,"toCharArray",$5];
    }
    | tkID tkSgIgual prNew TIPODATO tkAbrC CASTEO EXPRESION tkCerrC 
    {
        tablaSimbolos.push([$1,"Vector",$4,@1.first_line,@1.first_line]);
        $$ = [$1,"Tamaño1","CASTEO",$7];
    }
    | tkID tkSgIgual tkAbrLL LISTAVEC1 tkCerrLL
    {
        var aux = [$1,"Valores1"];
        for (let i = 0; i < $4.length; i++){
            aux.push($4[i]);
        }
        tablaSimbolos.push([$1,"Vector","-",@1.first_line,@1.first_line]);
        $$ = aux;
    }
;

TIPOV2
    : tkID tkSgIgual prNew TIPODATO tkAbrC EXPRESION tkCerrC tkAbrC EXPRESION tkCerrC
    { 
        tablaSimbolos.push([$1,"Vector",$4,@1.first_line,@1.first_column]);
        $$ = [$1,"Tamaño2",$6,$9];}
    | tkID tkSgIgual tkAbrLL tkAbrLL LISTAVEC1 tkCerrLL tkComa  tkAbrLL LISTAVEC1 tkCerrLL tkCerrLL
    {
        tablaSimbolos.push([$1,"Vector","-",@1.first_line,@1.first_column]);
        var aux = [$1,"ValoresP1"];      
        for (let i = 0; i < $5.length; i++){
            aux.push($5[i]);
        }
        aux.push("ValoresP2");
        for (let i = 0; i < $9.length; i++){
            aux.push($9[i]);
        }
        $$ = aux;
    }
;
    
LISTAVEC1
    : LISTAVEC1 tkComa EXPRESION {$1.push($3); $$ = $1}
    | EXPRESION {$$ = [$1];}
;

MODIFICARVEC
    : tkID tkAbrC EXPRESION tkCerrC tkSgIgual EXPRESION
    { $$ = ["ModificarVector",$1,$3,$5,$6]}
    | tkID tkAbrC EXPRESION tkCerrC tkAbrC EXPRESION tkCerrC tkSgIgual EXPRESION
    { $$ = ["ModificarVector",$1,"Posicion1",$3,"Posicion2",$6,$8,$9]}
;

OPVEC
    : tkID prPush tkAbrP EXPRESION tkCerrP
    {
        var aux = ["PUSH",$1];
        if(typeof $4 === "object"){
            for (let i = 0; i < $4.length; i++){
                aux.push($4[i]);
            }
        }else{
            aux.push($4);
        }
        $$ = aux;
    }
    | tkID prPop tkAbrP tkCerrP {$$=["POP",$1]}
;

CONDICIONALES
    : IF        {$$ =$1}
    | SWITCH    {$$ =$1}
;

IF
    : prIF tkAbrP EXPRESION tkCerrP BLOQUEIF 
    {   
        var aux = ["IF"];
        
        for (let i = 0; i < $3.length; i++){
            aux.push($3[i]);
        }

        //instrucciones
        if($5[1][0] === "ELSE" || $5[1][0] === "ELIF"){
            for (let i = 0; i < $5.length; i++){
                aux.push($5[i]);
            }
        }else{
            aux.push($5);
        }

        $$ = aux;
    }
;

BLOQUEIF
    : tkAbrLL CUERPO tkCerrLL {$$ = $2;}
    | tkAbrLL CUERPO tkCerrLL ELIFELSE {$$ = [$2,$4]}
//    | tkAbrLL CUERPO tkCerrLL ELSEB {$$ = [$2,$4]}
;

ELIFELSE
    : prElif tkAbrP EXPRESION tkCerrP BLOQUEIF 
    {
        var aux = ["ELIF"];
        for (let i = 0; i < $3.length; i++){
            aux.push($3[i]);
        }
       
        //instrucciones
        if($5[1][0] === "ELSE" || $5[1][0] === "ELIF"){
            for (let i = 0; i < $5.length; i++){
                aux.push($5[i]);
            }
        }else{
            aux.push($5);
        }
       
        $$ = aux;
    }
    | prElse BLOQUEIF  
    {
        var aux = ["ELSE"];
        aux.push($2);
        $$ = aux;
    }
;

// ELSEB
//     : prElse BLOQUEIF  
    
// ;

SWITCH
    : prSwitch tkAbrP EXPRESION tkCerrP BLOQUESW
    {
        var aux = ["SWITCH"];
        if(typeof $3 === "object"){
            for (let i = 0; i < $3.length; i++){
                aux.push($3[i]);
            }
        }else{
            aux.push($3);
        }
        aux.push($5);
        $$ = aux;
    }
;

BLOQUESW
    : tkAbrLL CASE DEFAULT tkCerrLL {$$ = [$2,$3]}
    | tkAbrLL CASE tkCerrLL {$$ = $2}
    | tkAbrLL DEFAULT tkCerrLL {$$ = $2}
;

CASE
    : CASE prCase EXPRESION tk2Puntos CUERPO
    {
        var aux = ["CASE"];
        if(typeof $3 === "object"){
            for (let i = 0; i < $3.length; i++){
                aux.push($3[i]);
            }
        }else{
            aux.push($3);
        }
        aux.push($5);
        $1.push(aux);
    }
    | prCase EXPRESION tk2Puntos CUERPO 
    {
        var aux = ["CASE"];
        if(typeof $2 === "object"){
            for (let i = 0; i < $2.length; i++){
                aux.push($2[i]);
            }
        }else{
            aux.push($2);
        }
        aux.push($4);
        $$=aux;
    }
;

DEFAULT
    : prDefault tk2Puntos CUERPO {$$ = ["DEFAULT",$3]}
;

CICLOS
    : WHILE {$$ = $1}
    | FOR   {$$ = $1}
    | DOWHILE {$$ = $1}
    | DOUNTIL {$$ = $1}
;

WHILE
    : prWhile tkAbrP EXPRESION tkCerrP tkAbrLL CUERPO tkCerrLL
    {
        var aux = ["WHILE"]
        if(typeof $3 === "object"){
            for (let i = 0; i < $3.length; i++){
                aux.push($3[i]);
            }
        }else{
            aux.push($3);
        }
        aux.push($6)
        $$ = aux;
    }
;

FOR 
    : prFor tkAbrP DECLARACION tkPtComa EXPRESION tkPtComa INCREMENTO tkCerrP tkAbrLL CUERPO tkCerrLL
    {
        $$ = ["FOR",$3,$5,$7,$10]
    }
    | prFor tkAbrP DECLARACION tkPtComa EXPRESION tkPtComa ASIGNACION tkCerrP tkAbrLL CUERPO tkCerrLL
    {
        $$ = ["FOR",$3,$5,$7,$10]
    }
    | prFor tkAbrP ASIGNACION tkPtComa EXPRESION tkPtComa INCREMENTO tkCerrP tkAbrLL CUERPO tkCerrLL
    {
        $$ = ["FOR",$3,$5,$7,$10]
    }
    | prFor tkAbrP ASIGNACION tkPtComa EXPRESION tkPtComa ASIGNACION tkCerrP tkAbrLL CUERPO tkCerrLL
    {
        $$ = ["FOR",$3,$5,$7,$10]
    }
;

DOWHILE
    : prDo tkAbrLL CUERPO tkCerrLL prWhile tkAbrP EXPRESION tkCerrP tkPtComa
    {
        var aux = ["DOWHILE",$3,"WHILE"];
        if(typeof $7 === "object"){
            for (let i = 0; i < $7.length; i++){
                aux.push($7[i]);
            }
        }else{
            aux.push($7);
        }
        $$ = aux;
    }
;

DOUNTIL
    : prDo tkAbrLL CUERPO tkCerrLL prUntil tkAbrP EXPRESION tkCerrP tkPtComa
    {
        var aux = ["DOUNTIL",$3,"HASTA"];
        if(typeof $7 === "object"){
            for (let i = 0; i < $7.length; i++){
                aux.push($7[i]);
            }
        }else{
            aux.push($7);
        }
        $$ = aux;
    }
;

CASTEO
    : tkAbrP TIPODATO tkCerrP {$$ = $2;}
;

INCREMENTO
    : tkID tkIncremento {$$ = ["Incremento",$1]}
    | tkID tkDecremento {$$ = ["Decremento",$1]}
;   

ASIGNACION
    : tkID tkSgIgual EXPRESION
    {
        var aux = ["ASIGNACION",$1,$2];

        if(typeof $3 === "object"){
            for (let i = 0; i < $3.length; i++){
                aux.push($3[i]);
            }
        }else{
            aux.push($3);
        }
        $$ = aux
    }
    | tkID tkSgIgual EXPRESION tkTernario EXPRESION tk2Puntos EXPRESION
    {
        var aux = ["ASIGNACION",$1,$2];
        if(typeof $3 === "object"){
            for (let i = 0; i < $3.length; i++){
                aux.push($3[i]);
            }
        }else{
            aux.push($3);
        }
        aux.push("TERNARIO");
        if(typeof $5 === "object"){
            for (let i = 0; i < $5.length; i++){
                aux.push($5[i]);
            }
        }else{
            aux.push($5);
        }
        aux.push(":");
        if(typeof $7 === "object"){
            for (let i = 0; i < $7.length; i++){
                aux.push($7[i]);
            }
        }else{
            aux.push($7);
        }
        $$ = aux;
    }
;

LISTAID
    : LISTAID tkComa tkID {$1.push($3);$$ = $1;}
    | tkID {  $$ = [$1]; }
;

TIPODATO
    : prInt     {$$=$1}
    | prDouble  {$$=$1}
    | prString  {$$=$1}
    | prChar    {$$=$1}
    | prBoolean {$$=$1}
;

EXPRESION
	: tkMenos EXPRESION %prec UMENOS  { var t = parseInt($2) * -1; $$=[t.toString()]} 
	| tkID tkDecremento {$$ = ["Decremento",$1]}
    | tkID tkIncremento {$$ = ["Incremento",$1]}

    | EXPRESION tkMas   EXPRESION  { var t = parseInt($1) + parseInt($3);$$=t.toString()}   
	| EXPRESION tkMenos EXPRESION  { var t = parseInt($1) - parseInt($3);$$=t.toString()}
	| EXPRESION tkMult EXPRESION   { var t = parseInt($1) * parseInt($3);$$=t.toString()} 
	| EXPRESION tkDiv EXPRESION    { var t = parseInt($1) / parseInt($3);$$=t.toString()}
    | EXPRESION tkMod EXPRESION    { var t = parseInt($1) % parseInt($3);$$=t.toString()}  
    | EXPRESION tkPot EXPRESION    { var t = Math.pow($1,$3); $$=t.toString()}
    | EXPRESION tkMenor  EXPRESION { $$ = [$1,$2,$3] }    
    | EXPRESION tkMayor  EXPRESION { $$ = [$1,$2,$3] }
    | EXPRESION tkMayorIgual EXPRESION  { $$ = [$1,$2,$3] }
    | EXPRESION tkMenorIgual EXPRESION  { $$ = [$1,$2,$3] }
    | EXPRESION tkIgual EXPRESION       { $$ = [$1,$2,$3] }
    | EXPRESION tkDiferente EXPRESION   { $$ = [$1,$2,$3] }

    | EXPRESION tkAnd EXPRESION { $$ = [$1,$2,$3] }
    | EXPRESION tkOr EXPRESION  { $$ = [$1,$2,$3] }
    | tkNot EXPRESION     { $$ = [$1,$2] }
    | tkEntero   {$$ = $1;}                    
    | tkDecimal  {$$ = $1;}
    | tkID       {$$ = $1;}
    | prTrue     {$$ = $1;}
    | prFalse    {$$ = $1;}
    | tkCadena   {$$ = $1;}
    | tkCaracter {$$ = $1;}
    | LLAMADAS  {$$=$1;}
    | FUNCS {$$=$1;}
    | ACCEDERVECTOR {$$ = $1}                                
	| tkAbrP EXPRESION tkCerrP  {$$=$2}      
;

ACCEDERVECTOR
    : tkID tkAbrC EXPRESION tkCerrC {$$=["ACCV",$1,"Posicion1",$3]}
    | tkID tkAbrC EXPRESION tkCerrC tkAbrC EXPRESION tkCerrC {$$=["ACCV",$1,"Posicion1",$3,"Posicion2",$6]}
;
