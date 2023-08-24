const keypom = require("@keypom/core");
const { toast } = require("react-toastify");
const {
	getPubFromSecret,
	getKeyInformation,
	hashPassword,
  getDropInformation,
  claim
} = keypom

async function allowEntry({privKey, basePassword}) {

  try {
    var publicKey = getPubFromSecret(privKey)
    var keyInfo = await getKeyInformation({publicKey})
    // Check 1: Key existence
    // If key does not exist, the user should not be admitted
    if(keyInfo == null) {
      toast(`Key does not exist. Admission denied`, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
      return false;
    }

    var curUse = keyInfo.cur_key_use 

    // Ticket was already scanned
    if (curUse !== 1) {
      console.log(``);
      toast(`Key has already been scanned. Admission denied`, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
      return false;
    }

    // Create password using base + pubkey + key use as string
    let passwordForClaim = await hashPassword(basePassword + publicKey + curUse.toString())
    // Claim with created password
    await claim({
      secretKey: privKey,
      password: passwordForClaim
    })

    // Check 3: Check if claim was successful by validating that curUse incremented
    keyInfo = await getKeyInformation({publicKey})
    let data = await getDropInformation({dropId: keyInfo.drop_id, secretKey: privKey, publicKey, withKeys: true});
    toast(`${data.fc.methods[1][0].args} Ticket`, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    })

    if (keyInfo.cur_key_use !== 2) {
      toast(`Claim has failed, check password`, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
      return false;
    }
  } catch(err) {
    toast(`Unknown Error: ${err}. Admission denied`, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    })
    return false;
  }
  return true
}

module.exports = {
  allowEntry
}
