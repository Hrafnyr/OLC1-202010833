import os




def crearDOT():
    path = "C:\\Users\Moises\\Documents\\NetBeansProjects\\Proyecto_1"
    comandoDot = 'dot -Tpng ' + path + '\\arbolS.dot -o ' + path + '\\arbolS.png'
    os.system(comandoDot)
   
    path2 = path + "\\arbolS.png"
    os.startfile(path2)

def main():
    crearDOT()

if __name__ == '__main__':
    main()