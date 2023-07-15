import {
  IonButton,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  UserCredential,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase";
import { add } from "ionicons/icons";
import { CarInfo } from "../../types";
import { mockCar } from "../../constants/mocks";
import { getCars, getCarsByUser } from "../../api/cars";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cars, setCars] = useState<CarInfo[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    getCars();
  }, [user]);

  const getCars = async () => {
    if (user) {
      const cars = await getCarsByUser(user.uid);
      setCars(cars);
    }
  };

  const handleSignIn = async () => {
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
    } catch (error: any) {
      switch (error.code) {
        case "auth/user-not-found":
          console.error("Usuario no encontrado");
          const createdUserCredential: UserCredential =
            await createUserWithEmailAndPassword(auth, email, password);
          setUser(createdUserCredential.user);
          break;
        case "auth/wrong-password":
          console.error("Contraseña incorrecta");
          break;
        default:
          console.error("Error desconocido");
          break;
      }
      console.error(error);
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      const userCredential: UserCredential = await signInWithPopup(
        auth,
        provider
      );
      setUser(userCredential.user);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <IonPage>
        <IonGrid className="ion-margin-top ion-padding-top">
          <IonSpinner name="circular" />
        </IonGrid>
      </IonPage>
    );
  }

  if (user) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Perfil - {user.displayName || user.email}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItemGroup>
              <IonItemDivider>
                <IonLabel>Vehículos registrados</IonLabel>
              </IonItemDivider>
              {cars.map((car) => (
                <IonItem key={car.id} detail routerLink={`/car/${car.id}`}>
                  <div>
                    <IonLabel>
                      {car.specs.make} {car.specs.model} {car.specs.modelYear}
                    </IonLabel>
                    <IonNote>{car.alias}</IonNote>
                  </div>
                </IonItem>
              ))}
              <IonButton routerLink="/register-car" color="dark" expand="full">
                Registrar Vehículo
                <IonIcon icon={add}></IonIcon>
              </IonButton>
            </IonItemGroup>
          </IonList>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItemGroup>
            <IonItem>
              <IonInput
                placeholder="Correo electrónico"
                value={email}
                onIonInput={({ detail }) => setEmail(detail.value ?? email)}
              />
            </IonItem>
            <IonItem>
              <IonInput
                placeholder="Contraseña"
                type="password"
                value={password}
                onIonInput={({ detail }) =>
                  setPassword(detail.value ?? password)
                }
              />
            </IonItem>
            <IonButton
              disabled={!password || !email}
              color="dark"
              expand="full"
              onClick={handleSignIn}
            >
              Iniciar sesión
            </IonButton>
          </IonItemGroup>
          <IonItemGroup>
            <IonItemDivider>Otras opciones</IonItemDivider>
            <IonButton expand="full" onClick={handleSignInWithGoogle}>
              Iniciar sesión con Google
            </IonButton>
          </IonItemGroup>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
