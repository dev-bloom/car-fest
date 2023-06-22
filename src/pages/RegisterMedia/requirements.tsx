import {
  IonCard,
  IonCardHeader,
  IonText,
  IonCardContent,
  IonCheckbox,
  IonLabel,
} from "@ionic/react";
import styles from "./style.module.scss";

type RegisterMediaRequirementsProps = {
  onCheckboxChange: (event: CustomEvent) => void;
};

const RegisterMediaRequirements = ({
  onCheckboxChange,
}: RegisterMediaRequirementsProps) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonText color="danger">
          <h1 className={styles.cardTitle}>
            Requisitos Acreditación Prensa The Carfest 2023
          </h1>
        </IonText>
      </IonCardHeader>
      <IonCardContent>
        <IonText className={styles.card}>
          <p>
            Formulario de inscripción como medio de prensa para el The Carfest,
            el cual se llevará a cabo en el Municipio de Sabaneta - Antioquia,
            los días 2 y 3 de julio de 2023.
            <br />
            <br />
            <p>
              Los medios de comunicación interesados en realizar este proceso de
              acreditación para hacer un cubrimiento periodístico deben tener en
              cuenta los siguientes requisitos para acceder a las
              acreditaciones:
            </p>
          </p>
          <p>
            <ol>
              <li>Nombre del medio a inscribir.</li>
              <li>
                Link de la página del medio (Facebook, Instagram, página web,
                etc.)
              </li>
              <li>
                Máximo personas por medio 3 (presentador, camarógrafo y
                redactor)
              </li>
              <li>Las personas deben ser mayor de edad.</li>
              <li>Datos personales de o las personas inscritas.</li>
              <li>
                Carta donde se certifique existencia del medio y sus
                integrantes.
              </li>
              <li>El medio debe tener un mínimo de 2 años de creación.</li>
              <li>
                Cada persona acreditada debe llevar su propio chaleco reflectivo
                para ser fácilmente identificado, The Carfest solo otorgará la
                escarapela a cada persona del medio (Nombre de la persona,
                nombre del medio y número de identificación).
              </li>
            </ol>
            <IonCard color="warning">
              <IonCardContent>
                <b>IMPORTANTE:</b> <br />{" "}
                <i>
                  La escarapela de identificación es de uso personal e
                  intransferible, cualquier miembro organizador del The Carfest
                  puede corroborar la información, pidiendo identificación
                  (cedula de ciudadanía). En el caso de no ser la persona
                  identificada con los datos de la escarapela, se procederá a
                  retirar la escarapela y retirar a todo el equipo del medio de
                  prensa del evento.
                </i>
              </IonCardContent>
            </IonCard>
            <p>
              Por favor, leer todos los requisitos y tener lista la
              documentación que se solicita en el formulario antes de empezar a
              llenarlo.
            </p>
            <br />
            <p>
              Además, es importante tener en cuenta que el proceso de
              acreditación es por cada medio de comunicación. Solo se tendrá en
              cuenta un formulario por cada medio de comunicación. Los datos de
              las personas que se acreditarán deben estar en la carta y, si se
              envían más nombres de los permitidos por tipo de medio, solamente
              se acreditarán las primeras personas del listado. <br />{" "}
              <b>NO HABRÁ EXCEPCIONES.</b>
            </p>
            <br />
            <p>
              El equipo de prensa de The CarFest, evaluará la información y
              soportes enviados en el formulario, confirmando antes del evento a
              los medios acreditados por correo electrónico. Si no se recibe el
              correo, quiere decir que el medio no fue acreditado.
            </p>
            <br />
          </p>
        </IonText>

        <IonCheckbox onIonChange={onCheckboxChange}>
          <IonLabel color="warning">Acepto términos y condiciones</IonLabel>
        </IonCheckbox>
      </IonCardContent>
    </IonCard>
  );
};

export default RegisterMediaRequirements;
