import React from "react";
import { Alert, Linking } from "react-native";
import { WebView } from "react-native-webview";

const DOMINIOS_PERMITIDOS = [
    "ifpr.edu.br",
    "www.ifpr.edu.br",
    "reactnative.dev",
    "www.reactnative.dev",
    "expo.dev",
    "www.expo.dev",
];

function dominioPermitido(url) {
    try {
        const urlObj = new URL(url);

        if (urlObj.protocol !== "https:") {
            return false;
        }

        return DOMINIOS_PERMITIDOS.some(
            (dominio) =>
                urlObj.hostname === dominio ||
                urlObj.hostname.endsWith("." + dominio)
        );
    } catch {
        return false;
    }
}

export default function WebViewSegura({ url }) {

    function controlarNavegacao(request) {
        const urlDestino = request.url;

        console.log("Tentando abrir:", urlDestino);

        // Permite páginas dos domínios autorizados
        if (dominioPermitido(urlDestino)) {
            return true;
        }

        // Links externos abrem no navegador do celular
        if (
            urlDestino.startsWith("https://") ||
            urlDestino.startsWith("http://")
        ) {
            Linking.openURL(urlDestino).catch(() => {
                Alert.alert(
                    "Navegação bloqueada",
                    "Não foi possível abrir este endereço no navegador."
                );
            });

            return false;
        }

        // Outros tipos de endereço são bloqueados
        Alert.alert(
            "Navegação bloqueada",
            "Este tipo de endereço não é permitido."
        );

        return false;
    }

    return (
        <WebView
            source={{ uri: url }}
            style={{ flex: 1 }}

            originWhitelist={[
                "https://ifpr.edu.br/*",
                "https://www.ifpr.edu.br/*",
                "https://reactnative.dev/*",
                "https://www.reactnative.dev/*",
                "https://expo.dev/*",
                "https://www.expo.dev/*",
            ]}

            onShouldStartLoadWithRequest={controlarNavegacao}

            
            javaScriptEnabled={true}

            domStorageEnabled={true}

            startInLoadingState={true}

            setSupportMultipleWindows={false}
        />
    );
}