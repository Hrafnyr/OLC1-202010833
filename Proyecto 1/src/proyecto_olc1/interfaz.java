/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package proyecto_olc1;

import Analizadores.A_sintactico;
import Analizadores.Analizador_Lexico;
import Analizadores.claseErrores;
import java.awt.Color;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.Reader;
import java.io.StringReader;
import java.util.logging.Level;
import java.util.logging.Logger;
import java_cup.runtime.Symbol;
import static javafx.scene.paint.Color.color;
import javax.swing.JFileChooser;
import javax.swing.JOptionPane;
import javax.swing.JTextPane;
import javax.swing.filechooser.FileNameExtensionFilter;
import javax.swing.text.AttributeSet;
import javax.swing.text.BadLocationException;
import javax.swing.text.DefaultStyledDocument;
import javax.swing.text.StyleConstants;
import javax.swing.text.StyleContext;

/**
 *
 * @author Moises
 */
public class interfaz extends javax.swing.JFrame {
    
    JFileChooser ver = new JFileChooser("./");
    
    File archivo;
    FileInputStream entrada;
    FileOutputStream salida;
    String nombre;
    int contV = 0;
    

    
    
    
    /**
     * Creates new form interfaz
     */
    public interfaz() {
        initComponents();
        this.setLocationRelativeTo(null);
        this.setVisible(true);
        this.btRun.setOpaque(true);
        this.btClean.setOpaque(true);
        this.jButton3.setOpaque(true);
        this.jButton4.setOpaque(true);
        this.txtErrores.setEditable(false);
        colors();
        
    }
    
    
    //METODO PARA ENCONTRAR LAS ULTIMAS CADENAS
    private int findLastNonWordChar(String text, int index) {
        while (--index >= 0) {
            //  \\W = [A-Za-Z0-9]
            if (String.valueOf(text.charAt(index)).matches("\\W")) {
                break;
            }
        }
        return index;
    }

    //METODO PARA ENCONTRAR LAS PRIMERAS CADENAS 
    private int findFirstNonWordChar(String text, int index) {
        while (index < text.length()) {
            if (String.valueOf(text.charAt(index)).matches("\\W")) {
                break;
            }
            index++;
        }
        return index;
    }

    //METODO PARA PINTAS LAS PALABRAS RESEVADAS
    private void colors() {

        final StyleContext cont = StyleContext.getDefaultStyleContext();

        //COLORES 
        final AttributeSet attred = cont.addAttribute(cont.getEmptySet(), StyleConstants.Foreground, new Color(255, 0, 35));
        final AttributeSet attgreen = cont.addAttribute(cont.getEmptySet(), StyleConstants.Foreground, new Color(34,139,34));
        final AttributeSet attblue = cont.addAttribute(cont.getEmptySet(), StyleConstants.Foreground, new Color(0, 147, 255));
        final AttributeSet attblack = cont.addAttribute(cont.getEmptySet(), StyleConstants.Foreground, new Color(0, 0, 0));

        //STYLO 
        DefaultStyledDocument doc = new DefaultStyledDocument() {
            public void insertString(int offset, String str, AttributeSet a) throws BadLocationException {
                super.insertString(offset, str, a);

                String text = getText(0, getLength());
                int before = findLastNonWordChar(text, offset);
                if (before < 0) {
                    before = 0;
                }
                int after = findFirstNonWordChar(text, offset + str.length());
                int wordL = before;
                int wordR = before;

                while (wordR <= after) {
                    if (wordR == after || String.valueOf(text.charAt(wordR)).matches("\\W")) {
                        if (text.substring(wordL, wordR).matches("(\\W)*(si|fin_si|ingresar|como|con_valor|de_lo_contrario|o_si|entonces|repetir|hasta_que|ejecutar)")) {
                            setCharacterAttributes(wordL, wordR - wordL, attblue, false);
                        } else if (text.substring(wordL, wordR).matches("(\\W)*(numero|cadena|boolean|caracter|para|hasta|fin_para|con_incremental|retornar|con_parametros|imprimir|imprimir_nl)")) {
                            setCharacterAttributes(wordL, wordR - wordL, attgreen, false);
                        } else if (text.substring(wordL, wordR).matches("(\\W)*(inicio|fin|segun|hacer|fin_segun|mientras|fin_mientras|metodo|fin_metodo|funcion|fin_funcion)")) {
                            setCharacterAttributes(wordL, wordR - wordL, attred, false);
                        } else {
                            setCharacterAttributes(wordL, wordR - wordL, attblack, false);
                        }
                        wordL = wordR;

                    }
                    wordR++;
                }
            }

            public void romeve(int offs, int len) throws BadLocationException {
                super.remove(offs, len);

                String text = getText(0, getLength());
                int before = findLastNonWordChar(text, offs);
                if (before < 0) {
                    before = 0;
                }
            }
        };

        JTextPane txt = new JTextPane(doc)
        {
            @Override
            public boolean getScrollableTracksViewportWidth()
            {
                return getUI().getPreferredSize(this).width 
                    <= getParent().getSize().width;
            }
        };
        String temp = txtCodigo.getText();
        txtCodigo.setStyledDocument(txt.getStyledDocument());
        txtCodigo.setText(temp);

    }
    
    //abrir archivo
    public String abrirArchivo(File archivo){
        
        String texto ="";
        
        try {
            entrada = new FileInputStream(archivo);
            int c;
            
            while ((c=entrada.read())!=-1) {                
                char caracter = (char)c;
                texto+=caracter;
            }
            
        } catch (Exception e) {
        }
        return texto;
    }
    
    /**
     * This method is called from within the constructor to initialize the form.
     * WARNING: Do NOT modify this code. The content of this method is always
     * regenerated by the Form Editor.
     */
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        jPanel1 = new javax.swing.JPanel();
        jLabel1 = new javax.swing.JLabel();
        btRun = new javax.swing.JButton();
        btClean = new javax.swing.JButton();
        jLabel2 = new javax.swing.JLabel();
        txtErrores = new javax.swing.JTextField();
        jButton3 = new javax.swing.JButton();
        jButton4 = new javax.swing.JButton();
        jScrollPane2 = new javax.swing.JScrollPane();
        txtCodigo = new javax.swing.JTextPane();
        jMenuBar1 = new javax.swing.JMenuBar();
        jMenu2 = new javax.swing.JMenu();
        jMenuItem2 = new javax.swing.JMenuItem();
        jMenuItem1 = new javax.swing.JMenuItem();
        jMenu3 = new javax.swing.JMenu();
        jMenuItem3 = new javax.swing.JMenuItem();
        jMenuItem4 = new javax.swing.JMenuItem();
        jMenuItem7 = new javax.swing.JMenuItem();
        jMenu4 = new javax.swing.JMenu();
        jMenuItem5 = new javax.swing.JMenuItem();
        jMenuItem6 = new javax.swing.JMenuItem();

        setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);
        setTitle("Project 1 OLC1");
        setAutoRequestFocus(false);
        setBackground(new java.awt.Color(204, 204, 204));
        setResizable(false);

        jPanel1.setBackground(new java.awt.Color(182, 204, 204));

        jLabel1.setFont(new java.awt.Font("Tahoma", 1, 20)); // NOI18N
        jLabel1.setText("OLC1_2S_2022 202010833");

        btRun.setBackground(new java.awt.Color(51, 153, 0));
        btRun.setFont(new java.awt.Font("DialogInput", 1, 24)); // NOI18N
        btRun.setForeground(new java.awt.Color(255, 255, 255));
        btRun.setText("Run");
        btRun.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btRunActionPerformed(evt);
            }
        });

        btClean.setBackground(new java.awt.Color(255, 255, 255));
        btClean.setFont(new java.awt.Font("DialogInput", 1, 22)); // NOI18N
        btClean.setText("Clean");
        btClean.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                btCleanActionPerformed(evt);
            }
        });

        jLabel2.setFont(new java.awt.Font("DialogInput", 3, 18)); // NOI18N
        jLabel2.setText("Errores:");

        txtErrores.setFont(new java.awt.Font("Tahoma", 1, 14)); // NOI18N
        txtErrores.setForeground(new java.awt.Color(255, 0, 51));
        txtErrores.setHorizontalAlignment(javax.swing.JTextField.CENTER);
        txtErrores.setText("0");
        txtErrores.setSelectedTextColor(new java.awt.Color(255, 255, 204));
        txtErrores.setSelectionColor(new java.awt.Color(0, 102, 102));
        txtErrores.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                txtErroresActionPerformed(evt);
            }
        });

        jButton3.setBackground(new java.awt.Color(0, 255, 255));
        jButton3.setFont(new java.awt.Font("DialogInput", 1, 18)); // NOI18N
        jButton3.setText("Ver código Golang");
        jButton3.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jButton3ActionPerformed(evt);
            }
        });

        jButton4.setBackground(new java.awt.Color(221, 236, 67));
        jButton4.setFont(new java.awt.Font("DialogInput", 1, 18)); // NOI18N
        jButton4.setText("Ver código Python");
        jButton4.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jButton4ActionPerformed(evt);
            }
        });

        txtCodigo.setFont(new java.awt.Font("Consolas", 0, 18)); // NOI18N
        txtCodigo.setSelectedTextColor(new java.awt.Color(255, 255, 204));
        txtCodigo.setSelectionColor(new java.awt.Color(0, 102, 102));
        jScrollPane2.setViewportView(txtCodigo);

        javax.swing.GroupLayout jPanel1Layout = new javax.swing.GroupLayout(jPanel1);
        jPanel1.setLayout(jPanel1Layout);
        jPanel1Layout.setHorizontalGroup(
            jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel1Layout.createSequentialGroup()
                .addGap(54, 54, 54)
                .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING)
                    .addGroup(jPanel1Layout.createSequentialGroup()
                        .addComponent(jLabel1)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                        .addComponent(btClean)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                        .addComponent(btRun, javax.swing.GroupLayout.PREFERRED_SIZE, 105, javax.swing.GroupLayout.PREFERRED_SIZE))
                    .addGroup(jPanel1Layout.createSequentialGroup()
                        .addComponent(jLabel2, javax.swing.GroupLayout.PREFERRED_SIZE, 96, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(txtErrores, javax.swing.GroupLayout.PREFERRED_SIZE, 58, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED, 684, Short.MAX_VALUE)
                        .addComponent(jButton3, javax.swing.GroupLayout.PREFERRED_SIZE, 227, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addGap(24, 24, 24)
                        .addComponent(jButton4, javax.swing.GroupLayout.PREFERRED_SIZE, 227, javax.swing.GroupLayout.PREFERRED_SIZE))
                    .addComponent(jScrollPane2, javax.swing.GroupLayout.Alignment.LEADING))
                .addGap(49, 49, 49))
        );
        jPanel1Layout.setVerticalGroup(
            jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel1Layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, jPanel1Layout.createSequentialGroup()
                        .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                            .addComponent(btRun, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                            .addComponent(btClean, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                        .addGap(18, 18, 18))
                    .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, jPanel1Layout.createSequentialGroup()
                        .addComponent(jLabel1, javax.swing.GroupLayout.PREFERRED_SIZE, 40, javax.swing.GroupLayout.PREFERRED_SIZE)
                        .addGap(53, 53, 53)))
                .addComponent(jScrollPane2, javax.swing.GroupLayout.PREFERRED_SIZE, 587, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addGap(18, 18, 18)
                .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(jLabel2, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                    .addComponent(txtErrores, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(jButton3, javax.swing.GroupLayout.DEFAULT_SIZE, 40, Short.MAX_VALUE)
                    .addComponent(jButton4, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
                .addGap(39, 39, 39))
        );

        getContentPane().add(jPanel1, java.awt.BorderLayout.CENTER);

        jMenu2.setText("Archivo");

        jMenuItem2.setAccelerator(javax.swing.KeyStroke.getKeyStroke(java.awt.event.KeyEvent.VK_O, java.awt.event.InputEvent.CTRL_MASK));
        jMenuItem2.setText("Abrir archivo");
        jMenuItem2.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jMenuItem2ActionPerformed(evt);
            }
        });
        jMenu2.add(jMenuItem2);

        jMenuItem1.setAccelerator(javax.swing.KeyStroke.getKeyStroke(java.awt.event.KeyEvent.VK_S, java.awt.event.InputEvent.CTRL_MASK));
        jMenuItem1.setText("Guardar como...");
        jMenuItem1.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jMenuItem1ActionPerformed(evt);
            }
        });
        jMenu2.add(jMenuItem1);

        jMenuBar1.add(jMenu2);

        jMenu3.setText("Reportes");
        jMenu3.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jMenu3ActionPerformed(evt);
            }
        });

        jMenuItem3.setText("Diagrama de flujo");
        jMenu3.add(jMenuItem3);

        jMenuItem4.setText("Errores");
        jMenuItem4.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jMenuItem4ActionPerformed(evt);
            }
        });
        jMenu3.add(jMenuItem4);

        jMenuItem7.setText("Árbol Sintáctico");
        jMenuItem7.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                jMenuItem7ActionPerformed(evt);
            }
        });
        jMenu3.add(jMenuItem7);

        jMenuBar1.add(jMenu3);

        jMenu4.setText("Ver");

        jMenuItem5.setText("Manual de Usuario");
        jMenu4.add(jMenuItem5);

        jMenuItem6.setText("Manual Técnico");
        jMenu4.add(jMenuItem6);

        jMenuBar1.add(jMenu4);

        setJMenuBar(jMenuBar1);

        pack();
    }// </editor-fold>//GEN-END:initComponents

    private void jMenuItem2ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jMenuItem2ActionPerformed
        
        //filtro
        FileNameExtensionFilter filtro = new FileNameExtensionFilter("Archivos olc", ".olc","olc");
        ver.setFileFilter(filtro);
        ver.setMultiSelectionEnabled(true);
        
        //abrir y obtener texto
        if(ver.showDialog(null, "Abrir archivo")==JFileChooser.APPROVE_OPTION){
            archivo = ver.getSelectedFile();
            
            if(archivo.canRead()){
                String cont = abrirArchivo(archivo);
                txtCodigo.setText(cont);
            }else{
                JOptionPane.showMessageDialog(null, "Error");
            }
            
        }
        
        
    }//GEN-LAST:event_jMenuItem2ActionPerformed

    private void txtErroresActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_txtErroresActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_txtErroresActionPerformed

    private void jButton4ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jButton4ActionPerformed
        
        if(contV==0){
               JOptionPane.showMessageDialog(null, "Debe presionar el botón Run ");
            
        }else{
            String txt = A_sintactico.txtPython;
        
            //filtro
            FileNameExtensionFilter filtro = new FileNameExtensionFilter("Archivos py", ".py","py");
            ver.setFileFilter(filtro);
            ver.setMultiSelectionEnabled(true);

            //Metodo para guardar
            if(ver.showDialog(null, "Guardar")==JFileChooser.APPROVE_OPTION){
                archivo = ver.getSelectedFile().getAbsoluteFile() ;
                if (archivo != null) {
                String nombre = ver.getSelectedFile().getName();
                    try {
                        FileWriter data = new FileWriter(archivo+".py");
                        data.write(txt);
                        data.close();
                    } catch (Exception e) {

                    }
                }
            }else{
                    return;
                }
        }
    }//GEN-LAST:event_jButton4ActionPerformed

    private void btRunActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btRunActionPerformed
        contV=1;
        //Limpiar errores para nueva verificacion y tabla
        Analizador_Lexico.TError.clear();
        
        //limpiar textoGuardado
        A_sintactico.txtPython="";
        A_sintactico.txtGo="";
        
        //mostrar errores
        txtErrores.setEditable(true);
        txtErrores.setText(String.valueOf(Analizador_Lexico.TError.size()));
        txtErrores.setEditable(false);
                
        if (txtCodigo.getText().isEmpty()) {
            System.out.println("No se ha escrito nada");
        } else {
        
            try {
                File archivo = new File("archivo.txt");
                // Si el archivo no existe es creado
                if (!archivo.exists()) {
                    archivo.createNewFile();
                }
                FileWriter fw = new FileWriter(archivo);
                BufferedWriter bw = new BufferedWriter(fw);
                bw.write(txtCodigo.getText());
                bw.close();

                //lexico
                Analizador_Lexico lexico = new Analizador_Lexico(
                        new BufferedReader(new FileReader(archivo))
                );
                
                

                //sintactico
                try {
                    A_sintactico sintactico = new A_sintactico(lexico);
                    sintactico.parse();
                } catch (Exception e) {
                    
                }
                
                
                //mostrar errores lexicos y sintacticos
                
                txtErrores.setEditable(true);
                txtErrores.setText(String.valueOf(Analizador_Lexico.TError.size()));
                txtErrores.setEditable(false);
               

            } catch (Exception e) {
                e.printStackTrace();
            }   
        }
    }//GEN-LAST:event_btRunActionPerformed

    private void btCleanActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_btCleanActionPerformed
       contV=0;
       txtCodigo.setText("");
       txtErrores.setEditable(true);
       txtErrores.setText("0");
       txtErrores.setEditable(false);
    }//GEN-LAST:event_btCleanActionPerformed

    private void jMenuItem1ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jMenuItem1ActionPerformed
        //Metodo para guardar
        if(ver.showDialog(null, "Guardar")==JFileChooser.APPROVE_OPTION){
            archivo = ver.getSelectedFile().getAbsoluteFile() ;
            if (archivo != null) {
            String nombre = ver.getSelectedFile().getName();
                try {
                    FileWriter data = new FileWriter(archivo+".olc");
                    data.write(txtCodigo.getText());
                    data.close();
                } catch (Exception e) {
                    
                }
            }
        }else{
                return;
            }
    }//GEN-LAST:event_jMenuItem1ActionPerformed

    private void jMenuItem4ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jMenuItem4ActionPerformed
        //mostrar ventanta de errores
        ReporteErrores vR = new ReporteErrores();
        vR.Clear_T(); //limpia tabla
        vR.addNewRow(); //agrega nuevos datos
        vR.setVisible(true);
    }//GEN-LAST:event_jMenuItem4ActionPerformed

    private void jButton3ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jButton3ActionPerformed
        if(contV==0){
               JOptionPane.showMessageDialog(null, "Debe presionar el botón Run ");
            
        }else{
            String txt = A_sintactico.txtGo;
        
            //filtro
            FileNameExtensionFilter filtro = new FileNameExtensionFilter("Archivos go", ".go","go");
            ver.setFileFilter(filtro);
            ver.setMultiSelectionEnabled(true);

            //Metodo para guardar
            if(ver.showDialog(null, "Guardar")==JFileChooser.APPROVE_OPTION){
                archivo = ver.getSelectedFile().getAbsoluteFile() ;
                if (archivo != null) {
                String nombre = ver.getSelectedFile().getName();
                    try {
                        FileWriter data = new FileWriter(archivo+".go");
                        data.write(txt);
                        data.close();
                    } catch (Exception e) {

                    }
                }
            }else{
                    return;
                }
        }
        
    }//GEN-LAST:event_jButton3ActionPerformed

    private void jMenu3ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jMenu3ActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_jMenu3ActionPerformed

    private void jMenuItem7ActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_jMenuItem7ActionPerformed
        // TODO add your handling code here:
    }//GEN-LAST:event_jMenuItem7ActionPerformed

    /**
     * @param args the command line arguments
     */
    public static void main(String args[]) {
        /* Set the Nimbus look and feel */
        //<editor-fold defaultstate="collapsed" desc=" Look and feel setting code (optional) ">
        /* If Nimbus (introduced in Java SE 6) is not available, stay with the default look and feel.
         * For details see http://download.oracle.com/javase/tutorial/uiswing/lookandfeel/plaf.html 
         */
        try {
            for (javax.swing.UIManager.LookAndFeelInfo info : javax.swing.UIManager.getInstalledLookAndFeels()) {
                if ("Nimbus".equals(info.getName())) {
                    javax.swing.UIManager.setLookAndFeel(info.getClassName());
                    break;
                }
            }
        } catch (ClassNotFoundException ex) {
            java.util.logging.Logger.getLogger(interfaz.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (InstantiationException ex) {
            java.util.logging.Logger.getLogger(interfaz.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (IllegalAccessException ex) {
            java.util.logging.Logger.getLogger(interfaz.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (javax.swing.UnsupportedLookAndFeelException ex) {
            java.util.logging.Logger.getLogger(interfaz.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        }
        //</editor-fold>

        /* Create and display the form */
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                new interfaz().setVisible(true);
            }
        });
    }

    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JButton btClean;
    private javax.swing.JButton btRun;
    private javax.swing.JButton jButton3;
    private javax.swing.JButton jButton4;
    private javax.swing.JLabel jLabel1;
    private javax.swing.JLabel jLabel2;
    private javax.swing.JMenu jMenu2;
    private javax.swing.JMenu jMenu3;
    private javax.swing.JMenu jMenu4;
    private javax.swing.JMenuBar jMenuBar1;
    private javax.swing.JMenuItem jMenuItem1;
    private javax.swing.JMenuItem jMenuItem2;
    private javax.swing.JMenuItem jMenuItem3;
    private javax.swing.JMenuItem jMenuItem4;
    private javax.swing.JMenuItem jMenuItem5;
    private javax.swing.JMenuItem jMenuItem6;
    private javax.swing.JMenuItem jMenuItem7;
    private javax.swing.JPanel jPanel1;
    private javax.swing.JScrollPane jScrollPane2;
    private javax.swing.JTextPane txtCodigo;
    private javax.swing.JTextField txtErrores;
    // End of variables declaration//GEN-END:variables
}
