// src/utils/vapidKeyUtils.js

/**
 * Converts a base64url string to a Uint8Array.
 * @param {string} base64String - The base64url encoded string.
 * @returns {Uint8Array} - The decoded Uint8Array.
 */
export function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
  