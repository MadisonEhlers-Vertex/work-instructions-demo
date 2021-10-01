import { errorRes } from "@lib/vertex-api";
import { WorkInstructionsSummary } from "@lib/work-instructions";

import type { NextApiRequest, NextApiResponse } from "next";
export let WORK_INSTRUCTIONS: WorkInstructionsSummary | undefined = undefined;
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<any>
): Promise<void> {
 
  if (req.method === 'POST') {
    try {
      const b: WorkInstructionsSummary = JSON.parse(req.body.instructions);

      console.log('body; ', b);
      WORK_INSTRUCTIONS = b;
  
      console.log('WorkInstructions: ', WORK_INSTRUCTIONS);
      res.redirect('/');
  
      return;
    } catch (error) {
      console.error(error);
      return errorRes("Unknown error.", res);
    }
  } else if (req.method === 'GET') {
      return res.json(WORK_INSTRUCTIONS || {});
  }
}
