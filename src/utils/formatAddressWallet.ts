export function formatAddressWallet(wallet: string) {
  const lengthWallet = wallet.length;

  let firstPartWallet = wallet.substring(0, 5);
  let twoPartWallet = wallet.substring(lengthWallet - 5, lengthWallet);

  return firstPartWallet.concat('...').concat(twoPartWallet);;
}