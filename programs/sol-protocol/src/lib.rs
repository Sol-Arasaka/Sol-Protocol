use anchor_lang::prelude::*;

declare_id!("7M5iD5J7hFHuk3UeP1ykrJK2VTK26Va638omgWbtUzMi");

#[program]
pub mod sol_protocol {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
