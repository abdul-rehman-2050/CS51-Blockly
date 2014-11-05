/**
 * @fileoverview Generating Assembly for math blocks.
 * @author supermind2002@gmail.com [Abdul Rehman -- Lahore,Pakistan]
 */



'use strict';
goog.provide('Blockly.Kasm51.output');
goog.require('Blockly.Kasm51');

Blockly.Kasm51['Define_BIT'] = function(block) {
  var code = block.getFieldValue('bit_name');
  var add = block.getFieldValue('Address');
   return code+'     BIT     '+add+'\n';
};
Blockly.Kasm51['Define_var'] = function(block) {
  // Numeric value.
  var code = block.getFieldValue('var_name');
  var add = block.getFieldValue('Address');
   return code+'     EQU     '+add+'\n';
};
Blockly.Kasm51['label_text'] = function(block) {
  // Numeric value.
  var code = block.getFieldValue('TEXT');
   return code;
};
Blockly.Kasm51['RETI'] = function(block) {
  
  return 'RETI';
  
};
Blockly.Kasm51['RET'] = function(block) {
  
 return 'RET';
};

Blockly.Kasm51['DJNZ'] = function(block) {
  var ADDRESS = block.getFieldValue('A');
  var VAR_OF = block.getFieldValue('V');
 return 'DJNZ         '+VAR_OF+','+ADDRESS+'\n';
};

Blockly.Kasm51['short_Assembly'] = function(block) {
  // Numeric value.
  var code = block.getFieldValue('TEXT');
   return code+"\n";
};


Blockly.Kasm51['Bit_Output'] = function(block) {

   var bit_mode = block.getFieldValue('MODE');
   var bb = Blockly.Kasm51.statementToCode (block,'A');
   return bit_mode+'           '+bb+'\n';
}

Blockly.Kasm51['MOV_BLOCK'] = function(block) {

  
   var bb1 = Blockly.Kasm51.statementToCode (block,'A');
    var bb2 = Blockly.Kasm51.statementToCode (block,'B');
   return 'MOV       '+bb1+","+bb2+'\n';
}




Blockly.Kasm51['ACALL'] = function(block) {

   var bit_mode = block.getFieldValue('MODE');
   var bb = Blockly.Kasm51.statementToCode (block,'A');
   return bit_mode+'           '+bb+'\n';
}
Blockly.Kasm51['JUMP'] = function(block) {

   var bit_mode = block.getFieldValue('MODE');
   var bb = Blockly.Kasm51.statementToCode (block,'A');
   return bit_mode+'           '+bb+'\n';
}

Blockly.Kasm51['BJUMP'] = function(block) {

   var bit_mode = block.getFieldValue('MODE');
   var bb = Blockly.Kasm51.statementToCode (block,'A');
   var ba = block.getFieldValue('bitAddress');
   return bit_mode+'           '+ba+','+bb+'\n';
}
Blockly.Kasm51['CJUMP'] = function(block) {

   var bit_mode = block.getFieldValue('MODE');
   var bb = Blockly.Kasm51.statementToCode (block,'A');
  
   return bit_mode+'           '+bb+'\n';
}
Blockly.Kasm51['JZ'] = function(block) {

   var bit_mode = block.getFieldValue('MODE');
   var bb = Blockly.Kasm51.statementToCode (block,'A');
  
   return bit_mode+'           '+bb+'\n';
}


Blockly.Kasm51['read_lookup'] = function(block) {

   var table_val = block.getFieldValue('A');
   var bb = Blockly.Kasm51.statementToCode (block,'i');
  
   var code = 'MOV		DPTR,#'+table_val+'\n'+'MOV		A,'+bb+'\nMOVC		A,@A+DPTR\n';
   
    
  
   return code;
}

Blockly.Kasm51['lookup'] = function(block) {

   var table_val = block.getFieldValue('A');
   
  
   return 'DB '+table_val;
}



Blockly.Kasm51['ORG'] = function(block) {

   
   var bb = Blockly.Kasm51.statementToCode (block,'A');
   return 'ORG           '+bb+'\n';
}
Blockly.Kasm51['END'] = function(block) {

   return 'END\n';
}