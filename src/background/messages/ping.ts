import type { PlasmoMessaging } from "@plasmohq/messaging"
 
const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const message = {
    foo: 'Bar'
  };
 
  res.send({
    message: req.body.id
  })
}
 
export default handler